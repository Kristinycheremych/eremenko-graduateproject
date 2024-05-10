const express = require("express");
const router = express.Router();
const UserModel = require("../models/EmployeesModel");

// Получение сотрудников
router.get("/get/employees", (req, res) => {
  UserModel.find()
    .populate("divisionsId")
    .populate("positionId")
    .populate("employeeStatusId")
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});

router.get("/get/employees/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .populate("divisionsId")
    .populate("positionId")
    .populate("employeeStatusId")
    .then((post) => res.json(post))
    .catch((err) => console.log(err));
});

// Добавление сотрудника
router.post("/create/employees", (req, res) => {
  const {
    lastName,
    firstName,
    middleName,
    position,
    gender,
    serviceNumber,
    employeeStatusId,
    positionId,
    divisionsId,
  } = req.body;
  const newProject = new UserModel({
    lastName,
    firstName,
    middleName,
    position,
    gender,
    serviceNumber,
    employeeStatusId,
    positionId,
    divisionsId,
  });
  newProject
    .save()
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});

// Изменение сотрудников
router.put("/update/employees/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    id,
    {
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      position: req.body.position,
      gender: req.body.gender,
      serviceNumber: req.body.serviceNumber,
      employeeStatusId: req.body.employeeStatusId,
      divisionsId: req.body.divisionsId,
      positionId: req.body.positionId,
    },
    { new: true }
  )
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});

// Удаление сотрудника
router.delete("/delete/employees/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

module.exports = router;
