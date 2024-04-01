const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

// Получение сотрудников
router.get('/', (req, res) => {
    UserModel.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
});

router.get('/get/:id', (req, res) => {
    const id = req.params.id
    UserModel.findById({ _id: id })
        .then(post => res.json(post))
        .catch(err => console.log(err))
});

// Добавление сотрудника
router.post('/create', (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err))
});

// Изменение сотрудников
router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({ _id: id }, {
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        position: req.body.position,
        isActive: req.body.isActive
    }).then(user => res.json(user))
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