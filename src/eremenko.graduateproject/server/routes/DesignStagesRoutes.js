const express = require('express');
const router = express.Router();
const DesignStages = require('../models/DesignStagesModel');

// Получить этапы для конкретного проекта
router.get('/projects/:projectId/designStages', (req, res) => {
    const projectId = req.params.projectId;
    DesignStages.find({ projectId })
        .populate('projectId')
        .populate('tasks.employees') // Запрос для заполнения данных о сотрудниках
        .then(stages => res.json(stages))
        .catch(err => res.status(500).json(err));
});

// Добавление этапов
router.post('/projects/:projectId/designStages', (req, res) => {
    const { title } = req.body;
    const { projectId } = req.params;
    const newStage = new DesignStages({
        title,
        projectId
    });
    newStage.save()
        .then(stage => res.json(stage))
        .catch(err => res.status(500).json(err));
});

// Изменение этапа
router.put('/projects/:projectId/designStages/:stageId', (req, res) => {
    const { stageId } = req.params;
    const { title } = req.body;

    DesignStages.findByIdAndUpdate(stageId, { title }, { new: true }) // { new: true } указывает на возврат обновленного документа
        .then(updatedStage => {
            if (!updatedStage) {
                return res.status(404).json({ error: 'Этап не найден' });
            }
            res.json(updatedStage);
        })
        .catch(err => res.status(500).json(err));
});

// Добавление задач к этапу
router.post('/projects/:projectId/designStages/:stageId/tasks', (req, res) => {
    const { title, description, employees } = req.body;
    const { stageId } = req.params;
    DesignStages.findById(stageId)
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

// Удаление этапа
router.delete('/projects/:projectId/designStages/:stageId', (req, res) => {
    const { stageId } = req.params;
    DesignStages.findByIdAndDelete(stageId)
        .then(stage => {
            if (!stage) {
                return res.status(404).json({ error: 'Этап не найден' });
            }
            res.json(stage);
        })
        .catch(err => res.status(500).json(err));
});

// Удаление задачи с этапа
router.delete('/projects/:projectId/designStages/:stageId/tasks/:taskId', (req, res) => {
    const { stageId, taskId } = req.params;
    DesignStages.findById(stageId)
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
router.post('/projects/:projectId/designStages/:sourceStageId/tasks/:taskId/move/:targetStageId', (req, res) => {
    const { sourceStageId, targetStageId, taskId } = req.params;

    // Этап, из которого нужно переместить задачу
    DesignStages.findById(sourceStageId)
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
            return DesignStages.findById(targetStageId)
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