const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
    title: String
});

const PositionModal = mongoose.model("position", PositionSchema)
module.exports = PositionModal