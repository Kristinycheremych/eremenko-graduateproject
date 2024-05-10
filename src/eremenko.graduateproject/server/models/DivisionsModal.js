const mongoose = require("mongoose");

const DivisionsSchema = new mongoose.Schema({
  code: Number,
  title: String,
});

const DivisionsModal = mongoose.model("divisions", DivisionsSchema);
module.exports = DivisionsModal;