const mongoose = require("mongoose");

const StageSchema = new mongoose.Schema({
  title: String,
  description: String,
});
const StageModal = mongoose.model("stages", StageSchema);
module.exports = StageModal;
