export default {
  id: "naga-x",
  name: "Naga X",
  vendorId: 0x1532,
  productId: 0x0096,
  tested: false,
  transactionId: {
    default: 0x1F,
    info: 0x1F,
    dpi: 0x1F,
    pollRate: 0x1F,
    lighting: 0x1F,
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
  lighting: {
    protocol: "extended-matrix",
    zones: [
      {
        id: "scroll",
        ledId: 0x01,
        name: "Колёсико",
        brightness: true,
        color: "rgb",
        defaultRgb: [0x00, 0xFF, 0x00],
        effects: ["none", "static", "breath", "spectrum", "wave"],
      },
      {
        id: "left",
        ledId: 0x11,
        name: "Левый бок",
        brightness: true,
        color: "rgb",
        defaultRgb: [0x00, 0xFF, 0x00],
        effects: ["none", "static", "breath", "spectrum", "wave"],
      },
    ],
  },
};
