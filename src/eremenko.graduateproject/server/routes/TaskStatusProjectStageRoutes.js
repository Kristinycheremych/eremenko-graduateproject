const express = require("express");
const router = express.Router();
const TaskStatusProjectStageModel = require("../models/TaskStatusProjectStageModel");
const StageProjectModal = require("../models/StageProjectModel");

// Роут для получения всех связей проектов и этапов
router.get("/get/taskStatusProjectStage", async (req, res) => {
  try {
    const taskStatusProjectStage = await TaskStatusProjectStageModel.find()
      .populate("taskStatusesId")
      .populate({
        path: "stageProjectId",
        populate: { path: "stageId" },
      })
      .populate({
        path: "stageProjectId",
        populate: { path: "projectId" },
      });
    res.json(taskStatusProjectStage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// Изменен роут для получения проектов по идентификатору проекта
router.get("/get/taskStatusProjectStage/:projectId", async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const taskStatusProjectStage = await TaskStatusProjectStageModel.find({ "stageProjectId.projectId._id": projectId })
      .populate("taskStatusesId")
      .populate({
        path: "stageProjectId",
        populate: { path: "stageId" },
      })
      .populate({
        path: "stageProjectId",
        populate: { path: "projectId" },
      });
    res.json(taskStatusProjectStage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});


// Добавление новой связи сотрудника и проекта
router.post("/addTaskStatusProjectStage", async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      periodExecution,
      stageId,
      projectId,
      taskStatusesId,
    } = req.body;

    const newStageProject = new StageProjectModal({
      startDate,
      endDate,
      periodExecution,
      stageId,
      projectId,
    });

    await newStageProject.save();

    const taskStatusProjectStage = new TaskStatusProjectStageModel({
      taskStatusesId,
      stageProjectId: newStageProject._id,
    });

    await taskStatusProjectStage.save();

    res.status(201).json({
      message: "Связь сотрудника и проекта успешно добавлена",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера при добавлении связи сотрудника и проекта" });
  }
});

// Удаление связи сотрудника и проекта по уникальному идентификатору
router.delete("/taskStatusProjectStage/:id", async (req, res) => {
  try {
    const deletedTaskStatusProjectStage = await TaskStatusProjectStageModel.findByIdAndDelete(req.params.id);
    if (!deletedTaskStatusProjectStage) {
      return res.status(404).json({ message: "Связь сотрудника и проекта не найдена" });
    }
    res.json({ message: "Связь сотрудника и проекта успешно удалена" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера при удалении связи сотрудника и проекта" });
  }
});

module.exports = router;