const mongoose = require("mongoose");

const PositionSchema = new mongoose.Schema({
  title: String,
});

const PositionModal = mongoose.model("positions", PositionSchema);
module.exports = PositionModal;
