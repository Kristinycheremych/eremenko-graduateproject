const mongoose = require('mongoose');

const EmployeeStatusSchema = new mongoose.Schema({
    title: String,
    description: String
});

const EmployeeStatusModel = mongoose.model("employee_status", EmployeeStatusSchema)
module.exports = EmployeeStatusModel