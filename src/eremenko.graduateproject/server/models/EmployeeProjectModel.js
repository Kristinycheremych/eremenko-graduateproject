const mongoose = require("mongoose");

const EmployeeProjectSchema = new mongoose.Schema({
  employeeId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  }],
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
  },
});

const EmployeeProjectModel = mongoose.model(
  "EmployeeProject",
  EmployeeProjectSchema
);
module.exports = EmployeeProjectModel;
