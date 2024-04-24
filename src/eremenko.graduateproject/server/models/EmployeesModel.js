const mongoose = require("mongoose");

const EmployeesSchema = new mongoose.Schema({
  lastName: String,
  firstName: String,
  middleName: String,
  gender: String,
  position: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "position",
  },
  employeeStatus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee_status",
  },
  divisions: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "divisions",
  },
});

const EmployeesModel = mongoose.model("users", EmployeesSchema);
module.exports = EmployeesModel;
