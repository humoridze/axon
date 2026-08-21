export default {
  id: "mamba-chroma-wireless",
  name: "Mamba Chroma (Wireless)",
  vendorId: 0x1532,
  productId: 0x0045,
  tested: false,
  transactionId: {
    default: 0xFF,
    info: 0xFF,
    dpi: 0xFF,
    pollRate: 0x3F,
    battery: 0xFF,
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
  battery: true,
};
