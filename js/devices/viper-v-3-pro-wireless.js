export default {
  id: "viper-v-3-pro-wireless",
  name: "Viper V3 Pro (Wireless)",
  vendorId: 0x1532,
  productId: 0x00C1,
  tested: false,
  transactionId: {
    default: 0x1F,
    info: 0x1F,
    dpi: 0x1F,
    pollRate: 0x1F,
    battery: 0x1F,
  },
  dpi: {
    min: 100,
    max: 35000,
    step: 50,
    independentAxes: true,
  },
  pollRate: {
    protocol: "v2",
    rates: [125, 500, 1000, 2000, 4000, 8000],
  },
  battery: true,
};
