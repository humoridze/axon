export default {
  id: "naga-v-2-pro-wired",
  name: "Naga V2 Pro (Wired)",
  vendorId: 0x1532,
  productId: 0x00A7,
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
    max: 30000,
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
        effects: ["none", "static", "breath", "spectrum", "wave"],
      },
      {
        id: "backlight",
        ledId: 0x00,
        name: "Корпус",
        brightness: false,
        color: "rgb",
        defaultRgb: [0x00, 0xFF, 0x00],
        effects: ["none", "static", "spectrum"],
      },
    ],
  },
};
