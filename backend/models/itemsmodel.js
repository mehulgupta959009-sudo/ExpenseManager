const { default: mongoose } = require("mongoose");

const dbSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authuser",
    required: true,
  },
  productName: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, default: "other" },
  description: { type: String, default: "" },
  date: { type: Date, default: Date.now },
  type: { type: String, enum: ["expense", "earning"], default: "expense" },
  createdAt: { type: Date, default: Date.now },
});

exports.addeditems = mongoose.model("addeditems", dbSchema);
