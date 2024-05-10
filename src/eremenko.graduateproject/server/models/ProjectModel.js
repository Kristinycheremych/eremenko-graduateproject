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
      ref: "employees", 
    },
  ],
});

const ProjectModel = mongoose.model("projects", projectSchema);
module.exports = ProjectModel;