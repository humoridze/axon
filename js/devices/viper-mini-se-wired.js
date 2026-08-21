export default {
  id: "viper-mini-se-wired",
  name: "Viper Mini SE (Wired)",
  vendorId: 0x1532,
  productId: 0x009E,
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
    max: 30000,
    step: 50,
    independentAxes: true,
  },
  pollRate: {
    protocol: "v2",
    rates: [125, 500, 1000],
  },
  battery: true,
};
