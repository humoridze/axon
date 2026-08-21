export default {
  id: "death-adder-v-2-pro-wireless",
  name: "DeathAdder V2 Pro (Wireless)",
  vendorId: 0x1532,
  productId: 0x007D,
  tested: false,
  transactionId: {
    default: 0x3F,
    info: 0x3F,
    dpi: 0x3F,
    pollRate: 0x3F,
    lighting: 0x3F,
    battery: 0x3F,
  },
  dpi: {
    min: 100,
    max: 20000,
    step: 50,
    independentAxes: true,
  },
  pollRate: {
    protocol: "v1",
    rates: [125, 500, 1000],
  },
  battery: true,
  lighting: {
    protocol: "extended-matrix",
    zones: [
      {
        id: "logo",
        ledId: 0x04,
        name: "Логотип",
        brightness: true,
        color: "rgb",
        defaultRgb: [0x00, 0xFF, 0x00],
        effects: ["none", "static", "breath", "spectrum"],
      },
    ],
  },
};
