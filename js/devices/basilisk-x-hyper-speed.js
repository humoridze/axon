export default {
  id: "basilisk-x-hyper-speed",
  name: "Basilisk X HyperSpeed",
  vendorId: 0x1532,
  productId: 0x0083,
  tested: true,
  transactionId: {
    default: 0xFF,
    info: 0xFF,
    dpi: 0xFF,
    pollRate: 0xFF,
    battery: 0xFF,
  },
  dpi: {
    min: 100,
    max: 16000,
    step: 100,
    independentAxes: true,
  },
  pollRate: {
    protocol: "v1",
    rates: [125, 500, 1000],
  },
  battery: true,
};
