export default {
  id: "basilisk-mobile-wired",
  name: "Basilisk Mobile (Wired)",
  vendorId: 0x1532,
  productId: 0x00D3,
  tested: true,
  transactionId: {
    default: 0x1F,
    info: 0x1F,
    dpi: 0x1F,
    pollRate: 0x1F,
    lighting: 0x1F,
    battery: 0x1F,
  },
  dpi: {
    min: 100,
    max: 18000,
    step: 100,
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
        id: "backlight",
        ledId: 0x00,
        name: "Корпус",
        brightness: true,
        color: "rgb",
        defaultRgb: [0x00, 0xFF, 0x00],
        effects: ["none", "static"],
      },
    ],
  },
};
