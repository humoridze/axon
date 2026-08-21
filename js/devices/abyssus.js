export default {
  id: "abyssus",
  name: "Abyssus",
  vendorId: 0x1532,
  productId: 0x0042,
  tested: false,
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
        effects: ["none"],
      },
    ],
  },
};
