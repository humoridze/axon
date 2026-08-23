export default {
  id: "death-adder-2013",
  name: "DeathAdder 2013",
  vendorId: 0x1532,
  productId: 0x0037,
  tested: true,
  transactionId: {
    default: 0xFF,
    info: 0xFF,
    pollRate: 0xFF,
    lighting: 0xFF,
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
        brightness: false,
        color: "rgb",
        defaultRgb: [0x00, 0xFF, 0x00],
        effects: ["none", "static", "breath"],
      },
      {
        id: "scroll",
        ledId: 0x01,
        name: "Колёсико",
        brightness: false,
        color: "rgb",
        defaultRgb: [0x00, 0xFF, 0x00],
        effects: ["none", "static", "breath"],
      },
    ],
  },
};
