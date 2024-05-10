const mongoose = require("mongoose");

const StageProjectSchema = new mongoose.Schema({
  stageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stages", // ссылка на модель статусов проектов
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "projects",
  },
  startDate: Date,
  endDate: Date,
  periodExecution: Date
});

const StageProjectModal = mongoose.model("stage_projects", StageProjectSchema);
module.exports = StageProjectModal;
