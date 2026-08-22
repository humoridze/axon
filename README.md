# Axon

Web driver for Razer mice. Runs in Chrome / Edge via [WebHID](https://developer.mozilla.org/en-US/docs/Web/API/WebHID_API).

Site: https://codexdev.ru/axon

Command protocol is [OpenRazer](https://github.com/openrazer/openrazer). This project is not affiliated with Razer Inc. and is not Razer Synapse.

## Support

Verified on hardware:

| Mouse | VID:PID |
| --- | --- |
| DeathAdder Essential (2021) | `1532:0098` |
| Basilisk V3 Pro (Wired) | `1532:00AA` |
| Basilisk V3 Pro (Wireless) | `1532:00AB` |

DeathAdder Essential: DPI (X/Y axes), polling 125/500/1000 Hz, logo brightness and effects (off / static / breathing). The LED is hardware green.

Basilisk V3 Pro (wired `00AA` / wireless `00AB`): DPI up to 30000, polling 125/500/1000 Hz, battery, logo / scroll wheel / body lighting (off / static / spectrum / wave).

Other mice from [OpenRazer](https://github.com/openrazer/openrazer) are included by PID and driver capabilities, but have not been tested on hardware. Profiles live in `js/devices/`.

## Usage

1. A Chromium browser (Chrome, Edge, Opera) over HTTPS.
2. Mouse over USB. Quit Razer Synapse first.
3. “Connect mouse” → pick the device in the system dialog.
4. If Chrome only shows “mouse” and the connection fails, that HID collection is blocked. Use the vendor interface of the same device (usually in the same list).

Settings are written to the mouse; no background process is required.

## Add a mouse

1. Create `js/devices/<slug>.js` following `deathadder-essential-2021.js`.
2. Import the profile in `js/devices/registry.js` and add it to `catalog`.
3. Take transaction ID, DPI, polling protocol (`v1` / `v2`), and lighting zones from OpenRazer (`driver/razermouse_driver.c`, `daemon/openrazer_daemon/hardware/mouse.py`).

The profile describes capabilities. The UI is built from them: DPI, polling, and lighting cards appear only when the model has them.

## Local run

HTTP(S) is required; WebHID will not work on `file://`.

```bash
python -m http.server 8080
```

Open `http://localhost:8080`.
