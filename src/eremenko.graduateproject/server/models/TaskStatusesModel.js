const mongoose = require("mongoose");

const TaskStatusesSchema = new mongoose.Schema({
  title: String
});

const TaskStatusesModel = mongoose.model("task_statuses", TaskStatusesSchema);
module.exports = TaskStatusesModel;
