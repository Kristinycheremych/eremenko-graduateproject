const express = require("express");
const router = express.Router();
const EmployeeStatusModel = require("../models/EmployeeStatusModel");

// Получение статуса сотрудника
router.get("/get/employeeStatus", (req, res) => {
  EmployeeStatusModel.find()
    .then((employeeStatus) => res.json(employeeStatus))
    .catch((err) => res.json(err));
});

module.exports = router;
