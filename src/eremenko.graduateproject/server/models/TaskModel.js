const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  stageProjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stageProject",
  },
  taskStatusId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "task_statuses",
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", 
  },
  employeeId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", 
    },
  ],
});

const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = TaskModel;
