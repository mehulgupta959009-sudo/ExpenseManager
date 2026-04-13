const { default: mongoose } = require("mongoose");

const dbSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  // location: { type: String, required: true },
  // price: { type: Number, required: true },
});

exports.addeditems = mongoose.model("addeditems", dbSchema);
