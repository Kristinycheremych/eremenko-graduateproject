const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  startDate: Date,
  endDate: Date,
  statusProjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project_statuses", 
  },
  supervisorId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", 
    },
  ],
});

const ProjectModel = mongoose.model("project", projectSchema);
module.exports = ProjectModel;