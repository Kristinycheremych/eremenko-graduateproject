const mongoose = require("mongoose");

const EmployeesSchema = new mongoose.Schema({
  lastName: String,
  firstName: String,
  middleName: String,
  isActive: Boolean,
  position: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "position",
  },
  employeeStatus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee_status",
  },
});

const EmployeesModel = mongoose.model("users", EmployeesSchema);
module.exports = EmployeesModel;
