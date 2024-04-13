const express = require('express');
const StageProjectModal = require('../models/StageProjectModel');
const router = express.Router();

// Получить этапы для конкретного проекта
router.get('/get/projects/:projectId/stageProject', (req, res) => {
    const projectId = req.params.projectId;
    StageProjectModal.find({ projectId })
        .populate('projectId')
        .populate('stageId')
        .populate('employees')
        .then(stageProject => res.json(stageProject))
        .catch(err => res.status(500).json(err));
});

router.get('/get/projects/:projectId/stageProject/:id', (req, res) => {
    const id = req.params.id;
    StageProjectModal.findOne({ _id: id })
        .populate('projectId')
        .populate('stageId')
        .populate({
            path: 'employees',
            populate: { path: 'position' }
        })
        .then(stageProject => res.json(stageProject))
        .catch(err => res.json(err));
});

// Добавить этап для конкретного проекта
router.post('/create/projects/:projectId/stageProject', async (req, res) => {
    const { projectId } = req.params;
    const { startDate, description, endDate, stageId, employees } = req.body;

    try {
        const newStage = new StageProjectModal({
            projectId,
            startDate,
            description,
            endDate,
            stageId,
            employees
        });

        const savedStage = await newStage.save();
        res.status(201).json(savedStage);
    } catch (error) {
        console.error('Ошибка при добавлении этапа:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Изменение проектов
router.put('/update/projects/:projectId/stageProject/:id', (req, res) => {
    const id = req.params.id;
    StageProjectModal.findByIdAndUpdate(id, {
        startDate: req.body.startDate,
        description: req.body.description,
        endDate: req.body.endDate,
        stageId: req.body.stageId,
        employees: req.body.employees
    }, { new: true })
        .then(updatedStageProject => res.json(updatedStageProject))
        .catch(err => res.json(err))
});

// Удалить этап для конкретного проекта
router.delete('/delete/projects/:projectId/stageProject/:stageProjectId', async (req, res) => {
    const { projectId, stageProjectId } = req.params;

    try {
        const deletedStage = await StageProjectModal.findByIdAndDelete(stageProjectId);
        if (!deletedStage) {
            return res.status(404).json({ error: 'Этап не найден' });
        }
        res.status(200).json(deletedStage);
    } catch (error) {
        console.error('Ошибка при удалении этапа:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

module.exports = router;