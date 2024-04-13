const mongoose = require('mongoose');

const StageSchema = new mongoose.Schema({
    title: String
});
const StageModal = mongoose.model("stage", StageSchema)
module.exports = StageModal