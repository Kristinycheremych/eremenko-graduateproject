const mongoose = require("mongoose");

const TaskStatusProjectStageSchema = new mongoose.Schema({
  taskStatusesId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "task_statuses",
  }],
  stageProjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stageProject",
  },
});

const TaskStatusProjectStageModel = mongoose.model("taskStatusProjectStage", TaskStatusProjectStageSchema);
module.exports = TaskStatusProjectStageModel;


