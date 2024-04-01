const express = require('express');
const router = express.Router();
const ProjectStatusesModel = require('../models/ProjectStatusesModel');

// Получение статуса проекта
router.get('/get/projectStatuses', (req, res) => {
    ProjectStatusesModel.find()
        .then(projectStatuses => res.json(projectStatuses))
        .catch(err => res.json(err))
});

router.get('/getProjectStatuses/:id', (req, res) => {
    const id = req.params.title
    ProjectStatusesModel.findById({ _id: id })
        .then(post => res.json(post))
        .catch(err => console.log(err))
});

// Добавление статуса проекта
router.post('/createProjectStatuses', (req, res) => {
    ProjectStatusesModel.create(req.body)
        .then(projectStatuses => res.json(projectStatuses))
        .catch(err => res.json(err))
})

// Изменение статуса проекта
router.put('/updateProjectStatuses/:id', (req, res) => {
    const id = req.params.id;
    ProjectStatusesModel.findByIdAndUpdate({ _id: id }, {
        title: req.body.title,
        description: req.body.description
    }).then(projectStatuses => res.json(projectStatuses))
        .catch(err => res.json(err))
});

// Удаление статуса проекта
router.delete('/deleteProjectStatuses/:id', (req, res) => {
    const id = req.params.id;
    ProjectStatusesModel.findByIdAndDelete({ _id: id })
        .then(response => res.json(response))
        .catch(err => res.json(err))
});

module.exports = router;