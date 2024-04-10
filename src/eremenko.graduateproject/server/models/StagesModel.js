const mongoose = require('mongoose');

const StagesSchema = new mongoose.Schema({
    title: String
});

const StagesModal = mongoose.model("stages", StagesSchema)
module.exports = StagesModal