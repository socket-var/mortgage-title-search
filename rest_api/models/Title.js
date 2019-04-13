const mongoose = require("mongoose");

const titleSchema = new mongoose.Schema({
  seller: String,
  buyer: String,
  date: String,
  transaction_type: String,
  price: String
});

module.exports = mongoose.model("Title", titleSchema);
