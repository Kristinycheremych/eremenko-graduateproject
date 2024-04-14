const express = require('express');
const router = express.Router();
const TaskStatusesModel = require('../models/TaskStatusesModel');

// Получение статусов задач по ID этапа проекта
router.get('/get/taskStatuses/:stageProjectId', (req, res) => {
    const stageProjectId = req.params.stageProjectId;
    TaskStatusesModel.find({ stageProjectId: stageProjectId })
        .then(taskStatuses => res.json(taskStatuses))
        .catch(err => res.json(err));
});

// Получение статуса задачи по ID
router.get('/get/taskStatuses/:stageProjectId/:id', (req, res) => {
    const id = req.params.id;
    TaskStatusesModel.findById(id)
        .then(taskStatus => res.json(taskStatus))
        .catch(err => res.json(err));
});

// Создание статуса задачи для конкретного этапа
router.post('/create/taskStatuses/:stageProjectId', (req, res) => {
    TaskStatusesModel.create(req.body)
        .then(taskStatus => res.json(taskStatus))
        .catch(err => res.json(err));
});

// Изменение статуса задачи
router.put('/update/taskStatuses/:id', (req, res) => {
    const id = req.params.id;
    TaskStatusesModel.findByIdAndUpdate(id, {
        title: req.body.title,
        description: req.body.description
    })
        .then(taskStatus => res.json(taskStatus))
        .catch(err => res.json(err))
});

// Удаление статуса задачи
router.delete('/delete/taskStatuses/:id', (req, res) => {
    const id = req.params.id;
    TaskStatusesModel.findByIdAndDelete(id)
        .then(response => res.json(response))
        .catch(err => res.json(err))
});

module.exports = router;