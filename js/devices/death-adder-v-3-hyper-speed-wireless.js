export default {
  id: "death-adder-v-3-hyper-speed-wireless",
  name: "DeathAdder V3 HyperSpeed (Wireless)",
  vendorId: 0x1532,
  productId: 0x00C5,
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
    max: 26000,
    step: 50,
    independentAxes: true,
  },
  pollRate: {
    protocol: "v1",
    rates: [125, 500, 1000],
  },
  battery: true,
};
