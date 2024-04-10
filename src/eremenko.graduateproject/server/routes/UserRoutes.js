const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

// Получение сотрудников
router.get('/', (req, res) => {
    UserModel.find()
        .populate('position')
        .then(users => res.json(users))
        .catch(err => res.json(err))
});

router.get('/get/:id', (req, res) => {
    const id = req.params.id
    UserModel.findById({ _id: id })
        .populate('position')
        .then(post => res.json(post))
        .catch(err => console.log(err))
});

// Добавление сотрудника
router.post('/create', (req, res) => {
    const { lastName, firstName, middleName, position, isActive } = req.body;
    const newProject = new UserModel({
        lastName,
        firstName,
        middleName,
        position,
        isActive
    });
    newProject.save()
        .then(positions => res.json(positions))
        .catch(err => res.json(err));
});

// Изменение сотрудников
router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate(id, {
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        position: req.body.position,
        isActive: req.body.isActive
    }, { new: true })
        .then(positions => res.json(positions))
        .catch(err => res.json(err))
});

// Удаление сотрудника
router.delete('/deleteuser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({ _id: id })
        .then(response => res.json(response))
        .catch(err => res.json(err))
});

module.exports = router;