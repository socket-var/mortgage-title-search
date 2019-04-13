const mongoose = require("mongoose");

const judgementSchema = new mongoose.Schema({
  owner: String,
  case_number: String,
  judgement_description: String,
  judgement_file_date: String,
  amount: String
});

module.exports = mongoose.model("Judgement", judgementSchema);
