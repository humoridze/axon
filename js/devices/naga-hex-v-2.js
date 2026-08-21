export default {
  id: "naga-hex-v-2",
  name: "Naga Hex V2",
  vendorId: 0x1532,
  productId: 0x0050,
  tested: false,
  transactionId: {
    default: 0x3F,
    info: 0x3F,
    dpi: 0x3F,
    pollRate: 0x3F,
    lighting: 0x3F,
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
        id: "logo",
        ledId: 0x04,
        name: "Логотип",
        brightness: true,
        color: "rgb",
        defaultRgb: [0x00, 0xFF, 0x00],
        effects: ["none", "static", "breath", "spectrum"],
      },
      {
        id: "scroll",
        ledId: 0x01,
        name: "Колёсико",
        brightness: true,
        color: "rgb",
        defaultRgb: [0x00, 0xFF, 0x00],
        effects: ["none", "static", "breath", "spectrum"],
      },
    ],
  },
};
