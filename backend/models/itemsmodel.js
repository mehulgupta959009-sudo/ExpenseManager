const { default: mongoose } = require("mongoose");

const dbSchema = new mongoose.Schema({
  expenseReason: { type: String, required: true },
  price: { type: Number, required: true },
  itemType: { type: String, required: true },
});

exports.addeditems = mongoose.model("addeditems", dbSchema);
