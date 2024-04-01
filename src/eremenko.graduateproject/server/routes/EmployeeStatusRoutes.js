const express = require('express');
const router = express.Router();
const EmployeeStatusModel = require('../models/EmployeeStatusModel');

// Получение статуса сотрудника
router.get('/get/employeeStatus', (req, res) => {
    EmployeeStatusModel.find()
        .then(employeeStatus => res.json(employeeStatus))
        .catch(err => res.json(err))
});

router.get('/getEmployeeStatus/:id', (req, res) => {
    const id = req.params.id
    EmployeeStatusModel.findById({ _id: id })
        .then(post => res.json(post))
        .catch(err => console.log(err))
});

// Добавление статуса сотрудника
router.post('/createEmployeeStatus', (req, res) => {
    EmployeeStatusModel.create(req.body)
        .then(employeeStatus => res.json(employeeStatus))
        .catch(err => res.json(err))
});

// Изменение статуса сотрудника
router.put('/updateEmployeeStatus/:id', (req, res) => {
    const id = req.params.id;
    EmployeeStatusModel.findByIdAndUpdate({ _id: id }, {
        title: req.body.title,
        description: req.body.description
    }).then(employeeStatus => res.json(employeeStatus))
        .catch(err => res.json(err))
});

// Удаление статуса сотрудника
router.delete('/deleteEmployeeStatus/:id', (req, res) => {
    const id = req.params.id;
    EmployeeStatusModel.findByIdAndDelete({ _id: id })
        .then(response => res.json(response))
        .catch(err => res.json(err))
});

module.exports = router;