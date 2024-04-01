const express = require('express');
const router = express.Router();
const TaskStatusesModel = require('../models/TaskStatusesModel');

// Получение статуса задачи
router.get('/get/taskStatuses', (req, res) => {
    TaskStatusesModel.find()
        .then(taskStatuses => res.json(taskStatuses))
        .catch(err => res.json(err))
});

router.get('/getTaskStatuses/:id', (req, res) => {
    const id = req.params.id
    TaskStatusesModel.findById({ _id: id })
        .then(post => res.json(post))
        .catch(err => console.log(err))
});

// Добавление статуса задачи
router.post('/createTaskStatuses', (req, res) => {
    TaskStatusesModel.create(req.body)
        .then(taskStatuses => res.json(taskStatuses))
        .catch(err => res.json(err))
});

// Изменение статуса задачи
router.put('/updateTaskStatuses/:id', (req, res) => {
    const id = req.params.id;
    TaskStatusesModel.findByIdAndUpdate({ _id: id }, {
        title: req.body.title,
        description: req.body.description
    }).then(taskStatuses => res.json(taskStatuses))
        .catch(err => res.json(err))
});

// Удаление статуса задачи
router.delete('/deleteTaskStatuses/:id', (req, res) => {
    const id = req.params.id;
    TaskStatusesModel.findByIdAndDelete({ _id: id })
        .then(response => res.json(response))
        .catch(err => res.json(err))
});

module.exports = router;