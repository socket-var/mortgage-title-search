const mongoose = require("mongoose");

const mortgageSchema = new mongoose.Schema({
  owner: String,
  mortgage_amount: String,
  current_balance: String,
  status: String
});

module.exports = mongoose.model("Mortgage", mortgageSchema);
