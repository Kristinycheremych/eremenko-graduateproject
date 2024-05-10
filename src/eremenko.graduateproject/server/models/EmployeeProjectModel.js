const mongoose = require("mongoose");

const EmployeeProjectSchema = new mongoose.Schema({
  employeeId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "employees",
  }],
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "projects",
  },
});

const EmployeeProjectModel = mongoose.model(
  "employee_project",
  EmployeeProjectSchema
);
module.exports = EmployeeProjectModel;