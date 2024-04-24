const mongoose = require("mongoose");

const ProjectStatusesSchema = new mongoose.Schema({
  title: String,
});

const ProjectStatusesModel = mongoose.model(
  "project_statuses",
  ProjectStatusesSchema
);
module.exports = ProjectStatusesModel;
