const express = require("express");
const router = express.Router();
const ProjectModel = require("../models/ProjectModel");
const ExecutorTaskModel = require("../models/ExecutorTaskModel");
const TaskModel = require("../models/TaskModel");

// Роут для получения всех связей сотрудников и проектов
router.get("/get/executorTask", async (req, res) => {
  try {
    const ExecutorTask = await ExecutorTaskModel.find()
      .populate({
        path: "employeeId",
        populate: { path: "position" },
      })
      .populate({
        path: "employeeId",
        populate: { path: "employeeStatus" },
      })
      .populate({
        path: "taskId",
        populate: { path: "creatorId" },
      })
      .populate({
        path: "taskId",
        populate: { path: "stageProjectId" },
      })
      .populate({
        path: "taskId",
        populate: { path: "taskStatusId" },
      });
    res.json(ExecutorTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.get("/executorTask/:id", async (req, res) => {
  try {
    const ExecutorTask = await ExecutorTaskModel.findById(req.params.id)
      .populate({
        path: "employeeId",
        populate: { path: "position" },
      })
      .populate({
        path: "employeeId",
        populate: { path: "employeeStatus" },
      })
      .populate({
        path: "taskId",
        populate: { path: "creatorId" },
      })
      .populate({
        path: "taskId",
        populate: { path: "stageProjectId" },
      })
      .populate({
        path: "taskId",
        populate: { path: "taskStatusId" },
      });
    if (!ExecutorTask) {
      return res
        .status(404)
        .json({ message: "Связь сотрудника и проекта не найдена" });
    }
    res.json(ExecutorTask);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Ошибка при получении связи сотрудника и проекта" });
  }
});

router.post("/addExecutorTask", async (req, res) => {
  try {
    const { title, description, creatorId, taskStatusId,stageProjectId, employeeId } = req.body;

    // Создаем запись проекта
    const newExecutorTask = new TaskModel({
      title,
      description,
      taskStatusId,
      stageProjectId,
      creatorId,
    });

    // Сохраняем запись проекта
    await newExecutorTask.save();

    // Создаем запись в промежуточной таблице
    const ExecutorTask = new ExecutorTaskModel({
      employeeId,
      taskId: newExecutorTask._id,
    });

    // Сохраняем запись в промежуточной таблице
    await ExecutorTask.save();

    res.status(201).json({
      message:
        "Проект успешно добавлен, и сотрудник успешно добавлен к проекту",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// Редактирование связи сотрудника и проекта по уникальному идентификатору
router.put("/update/executorTask/:id", async (req, res) => {
  const projectId = req.params.id;
  const {
    title,
    description,
    startDate,
    endDate,
    statusProjectId,
    supervisorId,
    employeeId,
  } = req.body;

  try {
    // Проверяем существование проекта по ID
    const existingProject = await ProjectModel.findById(projectId);
    if (!existingProject) {
      return res.status(404).json({ message: "Проект не найден" });
    }

    // Обновляем данные проекта
    existingProject.title = title;
    existingProject.description = description;
    existingProject.startDate = startDate;
    existingProject.endDate = endDate;
    existingProject.statusProjectId = statusProjectId;
    existingProject.supervisorId = supervisorId;

    // Сохраняем обновленные данные проекта
    await existingProject.save();

    // Обновляем участников проекта
    await ExecutorTaskModel.updateMany({ projectId }, { $set: { employeeId } });

    res.json({ message: "Проект успешно обновлен" });
  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// Удаление связи сотрудника и проекта по уникальному идентификатору
router.delete("/executorTask/:id", async (req, res) => {
  try {
    const deletedEmployeeProject = await ExecutorTaskModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedEmployeeProject) {
      return res
        .status(404)
        .json({ message: "Связь сотрудника и проекта не найдена" });
    }
    res.json({ message: "Связь сотрудника и проекта успешно удалена" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Ошибка при удалении связи сотрудника и проекта" });
  }
});

module.exports = router;
