const mongoose = require('mongoose');

const StageSchema = new mongoose.Schema({
    title: String,
    description: String
});
const StageModal = mongoose.model("stage", StageSchema)
module.exports = StageModal