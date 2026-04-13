const { default: mongoose } = require("mongoose");

const authSchema = new mongoose.Schema({
  fname: { type: String, required: [true, "First name is required"] },
  lname: { type: String, required: [true, "Last name is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
  },
  password: { type: String, required: [true, "Password is required"] },
  favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "addeditems" }],
});

exports.authuser = mongoose.model("authuser", authSchema);
