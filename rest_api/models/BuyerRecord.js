const mongoose = require("mongoose");

const buyerRecordsSchema = new mongoose.Schema({
  buyer: String,
  seller: String,
  property_name: String
});

module.exports = mongoose.model("BuyerRecord", buyerRecordsSchema);
