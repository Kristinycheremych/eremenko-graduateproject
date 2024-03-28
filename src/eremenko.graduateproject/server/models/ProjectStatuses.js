const mongoose = require('mongoose');

const ProjectStatusesSchema = new mongoose.Schema({
    title: String,
    description: String
});

const ProjectStatusesModel = mongoose.model("project_statuses", ProjectStatusesSchema)
module.exports = ProjectStatusesModel