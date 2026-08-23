export default {
  id: "death-adder-35-g-black",
  name: "DeathAdder 3.5G Black",
  vendorId: 0x1532,
  productId: 0x0029,
  tested: true,
  transactionId: {
    default: 0xFF,
    info: 0xFF,
    dpi: 0xFF,
    pollRate: 0xFF,
  },
  dpi: {
    min: 100,
    max: 3500,
    step: 100,
    independentAxes: true,
  },
  pollRate: {
    protocol: "v1",
    rates: [125, 500, 1000],
  },
};
