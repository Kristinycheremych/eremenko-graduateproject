const mongoose = require("mongoose");

const ExecutorTaskSchema = new mongoose.Schema({
  employeeId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
});

const ExecutorTaskModel = mongoose.model("executorTask", ExecutorTaskSchema);
module.exports = ExecutorTaskModel;
