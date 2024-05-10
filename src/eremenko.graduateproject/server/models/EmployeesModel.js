const mongoose = require("mongoose");

const EmployeesSchema = new mongoose.Schema({
  lastName: String,
  firstName: String,
  middleName: String,
  gender: String,
  serviceNumber: Number,
  positionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "position",
  },
  employeeStatusId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee_status",
  },
  divisionsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "divisions",
  },
});

const EmployeesModel = mongoose.model("users", EmployeesSchema);
module.exports = EmployeesModel;
