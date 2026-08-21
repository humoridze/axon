export default {
  id: "naga-epic-chroma-wired",
  name: "Naga Epic Chroma (Wired)",
  vendorId: 0x1532,
  productId: 0x003E,
  tested: false,
  transactionId: {
    default: 0xFF,
    info: 0xFF,
    dpi: 0xFF,
    pollRate: 0xFF,
    lighting: 0xFF,
    battery: 0xFF,
  },
  dpi: {
    min: 100,
    max: 8200,
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
