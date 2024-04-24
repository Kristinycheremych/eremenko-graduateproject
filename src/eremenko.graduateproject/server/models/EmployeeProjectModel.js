const mongoose = require("mongoose");

const EmployeeProjectSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // ссылка на модель сотрудников
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project", // ссылка на модель проектов
  }
});

const EmployeeProjectModel = mongoose.model("employee_project", EmployeeProjectSchema);
module.exports = EmployeeProjectModel;