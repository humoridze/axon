export default {
  id: "diamondback-chroma",
  name: "Diamondback Chroma",
  vendorId: 0x1532,
  productId: 0x004C,
  tested: true,
  transactionId: {
    default: 0xFF,
    info: 0xFF,
    dpi: 0xFF,
  },
  dpi: {
    min: 100,
    max: 16000,
    step: 100,
    independentAxes: true,
  },
};
