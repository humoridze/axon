export default {
  id: "death-adder-v-3",
  name: "DeathAdder V3",
  vendorId: 0x1532,
  productId: 0x00B2,
  tested: false,
  transactionId: {
    default: 0x1F,
    info: 0x1F,
    dpi: 0x1F,
    pollRate: 0x1F,
  },
  dpi: {
    min: 100,
    max: 30000,
    step: 50,
    independentAxes: true,
  },
  pollRate: {
    protocol: "v2",
    rates: [125, 500, 1000, 2000, 4000, 8000],
  },
};
