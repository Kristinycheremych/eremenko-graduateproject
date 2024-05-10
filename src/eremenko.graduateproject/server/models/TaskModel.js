const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  stageProjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stage_projects",
  },
  taskStatusId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "task_statuses",
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employees", 
  }
});

const TaskModel = mongoose.model("tasks", TaskSchema);

module.exports = TaskModel;