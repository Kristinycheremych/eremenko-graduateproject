const mongoose = require("mongoose");

const ExecutorTaskSchema = new mongoose.Schema({
  employeeId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employees",
    },
  ],
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tasks",
  },
  startDate: Date,
  endDate: Date,
});

const ExecutorTaskModel = mongoose.model("executor_task", ExecutorTaskSchema);
module.exports = ExecutorTaskModel;