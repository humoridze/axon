export default {
  id: "naga-trinity",
  name: "Naga Trinity",
  vendorId: 0x1532,
  productId: 0x0067,
  tested: true,
  transactionId: {
    default: 0xFF,
    info: 0xFF,
    dpi: 0xFF,
    pollRate: 0xFF,
    lighting: 0xFF,
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
  lighting: {
    protocol: "extended-matrix",
    zones: [
      {
        id: "backlight",
        ledId: 0x00,
        name: "Корпус",
        brightness: true,
        color: "rgb",
        defaultRgb: [0x00, 0xFF, 0x00],
        effects: ["static"],
      },
    ],
  },
};
