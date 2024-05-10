const mongoose = require("mongoose");

const TaskStatusProjectStageSchema = new mongoose.Schema({
  taskStatusesId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "task_statuses",
  }],
  stageProjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stage_projects",
  },
});

const TaskStatusProjectStageModel = mongoose.model("task_Status_Project_Stage", TaskStatusProjectStageSchema);
module.exports = TaskStatusProjectStageModel;


