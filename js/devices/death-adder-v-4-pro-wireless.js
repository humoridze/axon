export default {
  id: "death-adder-v-4-pro-wireless",
  name: "DeathAdder V4 Pro (Wireless)",
  vendorId: 0x1532,
  productId: 0x00BF,
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
    max: 45000,
    step: 50,
    independentAxes: true,
  },
  pollRate: {
    protocol: "v2",
    rates: [125, 500, 1000, 2000, 4000, 8000],
  },
  battery: true,
};
