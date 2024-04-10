const express = require('express');
const router = express.Router();
const ProjectStagesModel = require('../models/ProjectStagesModel');

// Получить все маршруты проектов
router.get('/projectStages', async (req, res) => {
    try {
        const routes = await ProjectStagesModel.find();
        res.json(routes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Получить конкретный маршрут проекта по ID
router.get('/projectStages/:id', async (req, res) => {
    try {
        const route = await ProjectStagesModel.findById(req.params.id);
        if (!route) {
            return res.status(404).json({ message: 'Маршрут не найден' });
        }
        res.json(route);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Получить все этапы проекта по ID проекта
router.get('/projects/:id/stages', async (req, res) => {
    try {
        const stages = await ProjectStagesModel.find({ projectId: req.params.id });
        res.json(stages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Создать новый маршрут проекта
router.post('/projectStages', async (req, res) => {
    try {
        const { projectId, stageId } = req.body;
        const newRoute = await ProjectStagesModel.create({ projectId, stageId });
        res.status(201).json(newRoute);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Удалить маршрут проекта по ID
router.delete('/projectStages/:id', async (req, res) => {
    try {
        const deletedRoute = await ProjectStagesModel.findByIdAndDelete(req.params.id);
        if (!deletedRoute) {
            return res.status(404).json({ message: 'Маршрут не найден' });
        }
        res.json({ message: 'Маршрут успешно удален' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;