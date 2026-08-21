export default {
  id: "death-adder-3500",
  name: "DeathAdder 3500",
  vendorId: 0x1532,
  productId: 0x0054,
  tested: false,
  transactionId: {
    default: 0xFF,
    info: 0xFF,
    dpi: 0xFF,
    pollRate: 0xFF,
    lighting: 0xFF,
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
        effects: ["none", "static", "breath"],
      },
      {
        id: "scroll",
        ledId: 0x01,
        name: "Колёсико",
        brightness: true,
        color: "rgb",
        defaultRgb: [0x00, 0xFF, 0x00],
        effects: ["none", "static", "breath"],
      },
    ],
  },
};
