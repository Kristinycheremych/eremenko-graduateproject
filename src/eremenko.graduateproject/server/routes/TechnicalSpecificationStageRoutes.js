const express = require('express');
const TechnicalSpecificationStageModel = require('../models/TechnicalSpecificationStageModel');
const router = express.Router();

// Получить этапы для конкретного проекта
router.get('/projects/:projectId/TechnicalSpecificationStage', (req, res) => {
    const projectId = req.params.projectId;
    TechnicalSpecificationStageModel.find({ projectId })
        .populate('projectId')
        .populate('tasks.employees')
        .then(stages => res.json(stages))
        .catch(err => res.status(500).json(err));
});

// Добавление этапа 
router.post('/projects/:projectId/TechnicalSpecificationStage', (req, res) => {
    const { title } = req.body;
    const { projectId } = req.params;
    const newSPDStage = new TechnicalSpecificationStageModel({
        title,
        projectId
    });
    newSPDStage.save()
        .then(stage => res.json(stage))
        .catch(err => res.status(500).json(err));
});

// Добавление задач к этапу
router.post('/projects/:projectId/TechnicalSpecificationStage/:stageId/tasks', (req, res) => {
    const { title, description, employees } = req.body;
    const { stageId } = req.params;
    TechnicalSpecificationStageModel.findById(stageId)
        .then(stage => {
            if (!stage) {
                return res.status(404).json({ error: 'Этап не найден' });
            }
            stage.tasks.push({ title, description, employees });
            return stage.save();
        })
        .then(stage => res.json(stage))
        .catch(err => res.status(500).json(err));
});

// Изменение этапа 
router.put('/projects/:projectId/TechnicalSpecificationStage/:StageId', (req, res) => {
    const { stageId } = req.params;
    const { title } = req.body;

    TechnicalSpecificationStageModel.findByIdAndUpdate(stageId, { title }, { new: true })
        .then(updatedStage => {
            if (!updatedStage) {
                return res.status(404).json({ error: 'Этап не найден' });
            }
            res.json(updatedStage);
        })
        .catch(err => res.status(500).json(err));
});


router.delete('/projects/:projectId/TechnicalSpecificationStage/:stageId', (req, res) => {
    const { stageId } = req.params;
    TechnicalSpecificationStageModel.findByIdAndDelete(stageId)
        .then(stage => {
            if (!stage) {
                return res.status(404).json({ error: 'Этап не найден' });
            }
            res.json(stage);
        })
        .catch(err => res.status(500).json(err));
});

// Удаление задачи с этапа
router.delete('/projects/:projectId/TechnicalSpecificationStage/:stageId/tasks/:taskId', (req, res) => {
    const { stageId, taskId } = req.params;
    TechnicalSpecificationStageModel.findById(stageId)
        .then(stage => {
            if (!stage) {
                return res.status(404).json({ error: 'Этап не найден' });
            }
            const task = stage.tasks.find(task => task._id == taskId);
            if (!task) {
                return res.status(404).json({ error: 'Задача не найдена' });
            }
            stage.tasks.pull(taskId); // Удаление задачи из массива tasks
            return stage.save();
        })
        .then(updatedStage => res.json(updatedStage))
        .catch(err => res.status(500).json({ error: 'Ошибка сервера' }));
});

// Перемещение задачи между этапами
router.post('/projects/:projectId/TechnicalSpecificationStage/:sourceStageId/tasks/:taskId/move/:targetStageId', (req, res) => {
    const { sourceStageId, targetStageId, taskId } = req.params;

    // Этап, из которого нужно переместить задачу
    TechnicalSpecificationStageModel.findById(sourceStageId)
        .then(sourceStage => {
            if (!sourceStage) {
                throw new Error('Исходный этап не найден');
            }

            // Задача для перемещения
            const taskToMove = sourceStage.tasks.find(task => task._id == taskId);
            if (!taskToMove) {
                throw new Error('Задача не найдена');
            }

            // Удалим задачу из исходного этапа
            sourceStage.tasks.pull(taskId);

            // Найдем целевой этап и добавьте задачу в него
            return TechnicalSpecificationStageModel.findById(targetStageId)
                .then(targetStage => {
                    if (!targetStage) {
                        throw new Error('Целевой этап не найден');
                    }
                    targetStage.tasks.push(taskToMove);
                    return Promise.all([sourceStage.save(), targetStage.save()]);
                });
        })
        .then(([sourceStage, targetStage]) => {
            res.json({ sourceStage, targetStage });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});


module.exports = router;