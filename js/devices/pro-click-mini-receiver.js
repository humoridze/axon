export default {
  id: "pro-click-mini-receiver",
  name: "Pro Click Mini (Receiver)",
  vendorId: 0x1532,
  productId: 0x009A,
  tested: false,
  transactionId: {
    default: 0x1F,
    info: 0x1F,
    dpi: 0x1F,
    pollRate: 0x1F,
    battery: 0x1F,
  },
  dpi: {
    min: 100,
    max: 12000,
    step: 100,
    independentAxes: true,
  },
  pollRate: {
    protocol: "v1",
    rates: [125, 500, 1000],
  },
  battery: true,
};
