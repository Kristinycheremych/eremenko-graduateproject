const express = require("express");
const router = express.Router();
const TaskModel = require("../models/TaskModel");

// Получение всех задач для конкретного статуса задачи
router.get("/tasks/:taskStatusId", async (req, res) => {
  try {
    const tasks = await TaskModel.find({
      taskStatusId: req.params.taskStatusId,
    }).populate("employees");
    res.json(tasks);
  } catch (error) {
    console.error(
      "Ошибка при получении задач для конкретного статуса задачи:",
      error
    );
    res
      .status(500)
      .json({
        error:
          "Ошибка сервера при получении задач для конкретного статуса задачи",
      });
  }
});

// Создание новой задачи для конкретного статуса задачи
router.post("/tasks/:taskStatusId", async (req, res) => {
  try {
    const { title, description, stageProjectId, employees } = req.body;
    const newTask = new TaskModel({
      title,
      description,
      stageProjectId,
      taskStatusId: req.params.taskStatusId,
      employees,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Ошибка при создании задачи для конкретного статуса:", error);
    res
      .status(500)
      .json({
        error: "Ошибка сервера при создании задачи для конкретного статуса",
      });
  }
});

// Изменение задачи для конкретного статуса задачи
router.put("/tasks/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { title, description, stageProjectId, employees } = req.body;
    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskId,
      {
        title,
        description,
        stageProjectId,
        employees,
      },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    console.error(
      "Ошибка при изменении задачи для конкретного статуса:",
      error
    );
    res
      .status(500)
      .json({
        error: "Ошибка сервера при изменении задачи для конкретного статуса",
      });
  }
});

// Удаление задачи для конкретного статуса задачи
router.delete("/tasks/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const deletedTask = await TaskModel.findByIdAndDelete(taskId);
    res.json(deletedTask);
  } catch (error) {
    console.error("Ошибка при удалении задачи для конкретного статуса:", error);
    res
      .status(500)
      .json({
        error: "Ошибка сервера при удалении задачи для конкретного статуса",
      });
  }
});

// Перемещение задачи между статусами задач
router.post("/tasks/:taskId/move/:newTaskStatusId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const newTaskStatusId = req.params.newTaskStatusId;

    // Найдите задачу по taskId и обновите taskStatusId
    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskId,
      { taskStatusId: newTaskStatusId },
      { new: true }
    ).populate("employees");

    res.json(updatedTask);
  } catch (error) {
    console.error("Ошибка при перемещении задачи:", error);
    res.status(500).json({ error: "Ошибка сервера при перемещении задачи" });
  }
});

module.exports = router;
