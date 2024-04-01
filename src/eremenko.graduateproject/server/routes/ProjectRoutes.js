const express = require('express');
const router = express.Router();
const ProjectModal = require('../models/ProjectModel');

// Получение проектов
router.get('/get/projects', (req, res) => {
    ProjectModal.find()
        .populate('status') // Популяция для получения данных о статусе проекта
        .populate('employees') // Добавляем информацию о сотрудниках
        .then(projects => res.json(projects))
        .catch(err => res.json(err));
});

router.get('/getProjects/:id', (req, res) => {
    const id = req.params.id;
    ProjectModal.findById(id)
        .populate('status') // Подставьте имя поля для связи с таблицей статусов
        .populate('employees') // Добавляем информацию о сотрудниках
        .then(project => res.json(project))
        .catch(err => res.json(err));
});

// Добавление проектов
router.post('/createProject', (req, res) => {
    const { title, description, startDate, endDate, status,employees} = req.body;
    const newProject = new ProjectModal({
        title,
        description,
        startDate,
        endDate,
        status,
        employees
    });
    newProject.save()
        .then(project => res.json(project))
        .catch(err => res.json(err));
});

// Изменение проектов
router.put('/updateProject/:id', (req, res) => {
    const id = req.params.id;
    ProjectModal.findByIdAndUpdate(id, {
        title: req.body.title,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
         // Добавляем новый статус проекта
    }, { new: true }) // Устанавливаем опцию { new: true }, чтобы получить обновленный объект
    .then(updatedProject => res.json(updatedProject))
    .catch(err => res.json(err))
});

// Удаление проекта
router.delete('/deleteProject/:id', (req, res) => {
    const id = req.params.id;
    ProjectModal.findByIdAndDelete({ _id: id })
        .then(response => res.json(response))
        .catch(err => res.json(err))
});

module.exports = router;