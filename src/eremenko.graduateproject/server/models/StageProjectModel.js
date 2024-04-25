const mongoose = require("mongoose");

const StageProjectSchema = new mongoose.Schema({
  stageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stage", // ссылка на модель статусов проектов
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
  },
  startDate: Date,
  endDate: Date,
  periodExecution: Date
});

const StageProjectModal = mongoose.model("stageProject", StageProjectSchema);
module.exports = StageProjectModal;
