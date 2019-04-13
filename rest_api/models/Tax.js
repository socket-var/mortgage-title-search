const mongoose = require("mongoose");

const taxSchema = new mongoose.Schema({
  owner: String,
  tax_year: String,
  taxes_received: String,
  amount: String
});

module.exports = mongoose.model("Tax", taxSchema);
