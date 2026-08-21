import { t } from './i18n.js';
import {
  STATUS,
  commands,
  decodeReport,
  encodeReport,
  joinU16,
  asciiFromBytes,
  POLL_V1_HZ,
  POLL_V2_HZ,
  statusLabel,
} from './protocol.js';

const WAIT_MS = 90;
const RETRIES = 5;
const RAZER_REPORT = 90;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function unwrapReport(dataView) {
  return new Uint8Array(dataView.buffer, dataView.byteOffset, dataView.byteLength);
}

function reportByteLength(report) {
  let bits = 0;
  for (const item of report.items ?? []) {
    bits += (item.reportSize ?? 0) * (item.reportCount ?? 0);
  }
  return Math.ceil(bits / 8);
}

function sizedPayload(payload, size) {
  if (payload.byteLength === size) return payload;
  const buffer = new Uint8Array(size);
  buffer.set(payload.subarray(0, Math.min(payload.byteLength, size)));
  return buffer;
}

function collectReports(hidDevice, kind) {
  const reports = [];
  for (const collection of hidDevice.collections ?? []) {
    const list = kind === 'output' ? collection.outputReports : collection.featureReports;
    for (const report of list ?? []) {
      reports.push({
        reportId: report.reportId ?? 0,
        size: reportByteLength(report),
        usagePage: collection.usagePage,
        usage: collection.usage,
        kind,
      });
    }
  }
  return reports;
}

function controlCandidates(hidDevice) {
  const found = [
    ...collectReports(hidDevice, 'feature'),
    ...collectReports(hidDevice, 'output'),
  ];
  const preferred = found.filter((report) => report.size >= RAZER_REPORT);
  const pool = preferred.length > 0 ? preferred : found;
  const extras = [
    { reportId: 0, size: RAZER_REPORT, kind: 'feature' },
    { reportId: 0, size: 91, kind: 'feature' },
    { reportId: 1, size: RAZER_REPORT, kind: 'feature' },
    { reportId: 0, size: RAZER_REPORT, kind: 'output' },
  ];
  const seen = new Set();
  const candidates = [];
  for (const report of [...pool, ...extras]) {
    const size = Math.max(report.size || RAZER_REPORT, RAZER_REPORT);
    const key = `${report.kind}:${report.reportId}:${size}`;
    if (seen.has(key)) continue;
    seen.add(key);
    candidates.push({ ...report, size });
  }
  candidates.sort((left, right) => {
    const vendor = (page) => (page === 0xFF00 || page === 0xFF01 ? 1 : 0);
    return vendor(right.usagePage) - vendor(left.usagePage) || right.size - left.size;
  });
  return candidates;
}

function scoreDevice(hidDevice) {
  let score = 0;
  for (const collection of hidDevice.collections ?? []) {
    if (collection.usagePage === 0xFF00 || collection.usagePage === 0xFF01) score += 10;
    for (const report of collection.featureReports ?? []) {
      if (reportByteLength(report) >= RAZER_REPORT) score += 20;
    }
    for (const report of collection.outputReports ?? []) {
      if (reportByteLength(report) >= RAZER_REPORT) score += 8;
    }
  }
  return score;
}

export class RazerSession {
  constructor(hidDevice, profile) {
    this.hidDevice = hidDevice;
    this.profile = profile;
    this.chain = Promise.resolve();
    this.reportId = 0;
    this.reportSize = RAZER_REPORT;
    this.useOutput = false;
  }

  transactionId(kind) {
    const ids = this.profile.transactionId;
    if (typeof ids === 'number') return ids;
    return ids[kind] ?? ids.default ?? 0xFF;
  }

  enqueue(task) {
    const run = this.chain.then(task, task);
    this.chain = run.catch(() => {});
    return run;
  }

  async request(kind, packet) {
    return this.enqueue(() => this.sendWithRetry(kind, packet));
  }

  async sendWithRetry(kind, packet) {
    let lastError = null;
    for (let attempt = 0; attempt < RETRIES; attempt += 1) {
      try {
        const response = await this.sendOnce(kind, packet);
        if (response.status === STATUS.SUCCESS || response.status === STATUS.BUSY) {
          return response;
        }
        lastError = new Error(t('commandRejected', { status: statusLabel(response.status) }));
      } catch (error) {
        lastError = error;
      }
      await sleep(WAIT_MS);
    }
    throw lastError ?? new Error(t('noReply'));
  }

  async writeReport(payload) {
    const body = sizedPayload(payload, this.reportSize);
    if (this.useOutput) {
      await this.hidDevice.sendReport(this.reportId, body);
    } else {
      await this.hidDevice.sendFeatureReport(this.reportId, body);
    }
  }

  async sendOnce(kind, packet) {
    const report = encodeReport({
      transactionId: this.transactionId(kind),
      ...packet,
    });
    await this.writeReport(report);
    await sleep(WAIT_MS);
    const raw = unwrapReport(await this.hidDevice.receiveFeatureReport(this.reportId));
    return decodeReport(raw);
  }

  async handshake() {
    const packet = encodeReport({
      transactionId: this.transactionId('info'),
      ...commands.getFirmware(),
    });
    let lastError = null;
    for (const candidate of controlCandidates(this.hidDevice)) {
      this.reportId = candidate.reportId;
      this.reportSize = candidate.size;
      this.useOutput = candidate.kind === 'output';
      try {
        await this.writeReport(packet);
        await sleep(WAIT_MS);
        const raw = unwrapReport(await this.hidDevice.receiveFeatureReport(this.reportId));
        const decoded = decodeReport(raw);
        if (decoded.status !== STATUS.SUCCESS && decoded.status !== STATUS.BUSY) continue;
        const firmware = `v${decoded.args[0] ?? 0}.${decoded.args[1] ?? 0}`;
        if (firmware === 'v0.0') continue;
        return firmware;
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError ?? new Error(t('noHidReport'));
  }

  async getFirmware() {
    const response = await this.request('info', commands.getFirmware());
    return `v${response.args[0] ?? 0}.${response.args[1] ?? 0}`;
  }

  async getSerial() {
    const response = await this.request('info', commands.getSerial());
    return asciiFromBytes(response.args) || '—';
  }

  parseDpi(args) {
    return {
      x: joinU16(args[1] ?? 0, args[2] ?? 0),
      y: joinU16(args[3] ?? 0, args[4] ?? 0),
    };
  }

  dpiMatches(read, dpiX, dpiY) {
    const slack = Math.max(this.profile.dpi?.step ?? 100, 50);
    return Math.abs(read.x - dpiX) <= slack && Math.abs(read.y - dpiY) <= slack;
  }

  scaledPair(dpiX, dpiY, divisor) {
    if (!divisor || divisor <= 1) return { x: dpiX, y: dpiY };
    if (dpiX >= 256 || dpiY >= 256) return { x: dpiX, y: dpiY };
    if (dpiX % divisor || dpiY % divisor) return { x: dpiX, y: dpiY };
    return { x: dpiX / divisor, y: dpiY / divisor };
  }

  async getDpi() {
    const response = await this.request('dpi', commands.getDpi());
    return this.parseDpi(response.args);
  }

  async writeDpi(dpiX, dpiY, endian = 'be') {
    await this.request('dpi', commands.setDpi(dpiX, dpiY, endian));
    await sleep(WAIT_MS);
    let applied = await this.getDpi();
    if (!this.dpiMatches(applied, dpiX, dpiY)) {
      await sleep(WAIT_MS);
      applied = await this.getDpi();
    }
    return applied;
  }

  async setDpi(dpiX, dpiY) {
    const endian = this.dpiEndian ?? 'be';
    const scaled = this.scaledPair(dpiX, dpiY, this.dpiDivisor ?? 1);
    let applied = await this.writeDpi(scaled.x, scaled.y, endian);
    if (this.dpiMatches(applied, dpiX, dpiY)) return;

    const tooFast = applied.x > dpiX * 8 || applied.y > dpiY * 8;
    if (!tooFast) return;

    for (const divisor of [100, 50]) {
      const pair = this.scaledPair(dpiX, dpiY, divisor);
      if (pair.x === dpiX && pair.y === dpiY) continue;
      applied = await this.writeDpi(pair.x, pair.y, 'be');
      if (this.dpiMatches(applied, dpiX, dpiY)) {
        this.dpiEndian = 'be';
        this.dpiDivisor = divisor;
        return;
      }
    }

    applied = await this.writeDpi(dpiX, dpiY, 'le');
    if (this.dpiMatches(applied, dpiX, dpiY)) {
      this.dpiEndian = 'le';
      this.dpiDivisor = 1;
      return;
    }

    await this.writeDpi(dpiX, dpiY, 'be');
    this.dpiEndian = 'be';
    this.dpiDivisor = 1;
  }

  async getPollRate() {
    if (!this.profile.pollRate) return null;
    if (this.profile.pollRate.protocol === 'v2') {
      const response = await this.request('pollRate', commands.getPollRateV2());
      return POLL_V2_HZ[response.args[0]] ?? POLL_V2_HZ[response.args[1]] ?? null;
    }
    const response = await this.request('pollRate', commands.getPollRateV1());
    return POLL_V1_HZ[response.args[0]] ?? null;
  }

  async setPollRate(hz) {
    if (!this.profile.pollRate) return;
    if (this.profile.pollRate.protocol === 'v2') {
      await this.request('pollRate', commands.setPollRateV2(hz));
      return;
    }
    await this.request('pollRate', commands.setPollRateV1(hz));
  }

  async getBrightness(ledId) {
    const response = await this.request('lighting', commands.getExtendedBrightness(ledId));
    return response.args[2] ?? 0;
  }

  async setBrightness(ledId, brightness) {
    await this.request('lighting', commands.setExtendedBrightness(ledId, brightness));
  }

  async setLighting(zone, effect, rgb) {
    const ledId = zone.ledId;
    if (effect === 'none') {
      await this.request('lighting', commands.setExtendedNone(ledId));
      return;
    }
    if (effect === 'spectrum') {
      await this.request('lighting', commands.setExtendedSpectrum(ledId));
      return;
    }
    if (effect === 'wave') {
      await this.request('lighting', commands.setExtendedWave(ledId));
      return;
    }
    if (effect === 'breath') {
      await this.request('lighting', commands.setExtendedBreath(ledId, rgb[0], rgb[1], rgb[2]));
      return;
    }
    await this.request('lighting', commands.setExtendedStatic(ledId, rgb[0], rgb[1], rgb[2]));
  }

  async getBattery() {
    const level = await this.request('battery', commands.getBattery());
    const charge = await this.request('battery', commands.getCharging());
    const raw = level.args[1] ?? 0;
    return {
      percent: Math.round((raw / 255) * 100),
      charging: (charge.args[1] ?? 0) === 1,
    };
  }

  async close() {
    if (this.hidDevice.opened) {
      await this.hidDevice.close();
    }
  }
}

export async function openControlInterface(hidDevices, resolveProfile) {
  const queue = [...hidDevices].sort((left, right) => scoreDevice(right) - scoreDevice(left));
  const errors = [];

  for (const hidDevice of queue) {
    const profile = resolveProfile(hidDevice.productId);
    if (!profile) continue;
    try {
      if (!hidDevice.opened) await hidDevice.open();
      const session = new RazerSession(hidDevice, profile);
      const firmware = await session.handshake();
      return { session, firmware };
    } catch (error) {
      errors.push(error);
      if (hidDevice.opened) {
        try { await hidDevice.close(); } catch { /* ignore */ }
      }
    }
  }

  const unknown = hidDevices.find((device) => !resolveProfile(device.productId));
  if (unknown && queue.every((device) => !resolveProfile(device.productId))) {
    const pid = unknown.productId.toString(16).padStart(4, '0');
    throw new Error(t('unsupportedMouse', { pid }));
  }

  const detail = errors[0]?.message ? `: ${errors[0].message}` : '';
  throw new Error(t('noControlInterface', { detail }));
}
