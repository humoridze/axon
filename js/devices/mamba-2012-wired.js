export default {
  id: "mamba-2012-wired",
  name: "Mamba 2012 (Wired)",
  vendorId: 0x1532,
  productId: 0x0024,
  tested: true,
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
    max: 6400,
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
        effects: ["none", "static", "spectrum"],
      },
    ],
  },
};
