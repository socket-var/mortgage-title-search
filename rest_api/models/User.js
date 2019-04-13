const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  // other valid types are approver, admin
  userType: { type: String, default: "customer" }
  // purchases: [{ transactionId: String, productId: String, boughtFrom: String }],
  // sales: [{ transactionId: String, productId: String, soldTo: String }],
});

module.exports = mongoose.model("User", userSchema);
