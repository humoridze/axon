export default {
  id: "pro-click-v-2-vertical-edition-wireless",
  name: "Pro Click V2 Vertical Edition (Wireless)",
  vendorId: 0x1532,
  productId: 0x00C8,
  tested: false,
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
    protocol: "v2",
    rates: [125, 250, 500, 1000],
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
        effects: ["none", "static", "spectrum", "wave"],
      },
    ],
  },
};
