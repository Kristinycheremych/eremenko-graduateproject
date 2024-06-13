const express = require("express");
const router = express.Router();
const ProjectModel = require("../models/ProjectModel");
const ExecutorTaskModel = require("../models/ExecutorTaskModel");
const TaskModel = require("../models/TaskModel");

router.get("/get/executorTask", async (req, res) => {
  try {
    const ExecutorTask = await ExecutorTaskModel.find()
      .populate("employeeId") // Заполнение информации о сотрудниках
      .populate({
        path: "taskId",
        populate: [
          { path: "creatorId" },
          { path: "stageProjectId" },
          { path: "taskStatusId" },
        ],
      });
    res.json(ExecutorTask);
  } catch (error) {
    console.error(error, "Ошибка сервера");
  }
});

router.get("/executorTask/:id", async (req, res) => {
  try {
    const ExecutorTask = await ExecutorTaskModel.findById(req.params.id)
      .populate("employeeId") // Заполнение информации о сотрудниках
      .populate({
        path: "taskId",
        populate: [
          { path: "creatorId" },
          { path: "stageProjectId" },
          { path: "taskStatusId" },
        ],
      });
    if (!ExecutorTask) {
      return res.json({ message: "Связь сотрудника и проекта не найдена" });
    }
    res.json(ExecutorTask);
  } catch (err) {
    console.error(err);
    res.json({ message: "Ошибка при получении связи сотрудника и проекта" });
  }
});

router.post("/addExecutorTask", async (req, res) => {
  try {
    const {
      title,
      description,
      creatorId,
      taskStatusId,
      stageProjectId,
      startDate,
      endDate,
      employeeId,
    } = req.body;

    // Создаем запись в промежуточной таблице ExecutorTaskModel
    const newExecutorTask = new ExecutorTaskModel({
      employeeId,
      startDate,
      endDate,
      taskId: null, // Временно оставляем taskId пустым, так как он будет заполнен после создания задачи
    });

    // Сохраняем запись в промежуточной таблице ExecutorTaskModel
    const savedExecutorTask = await newExecutorTask.save();

    // Создаем запись задачи в модели TaskModel
    const newTask = new TaskModel({
      title,
      description,
      taskStatusId,
      stageProjectId,
      creatorId,
    });

    // Устанавливаем связь задачи с промежуточной таблицей ExecutorTaskModel
    savedExecutorTask.taskId = newTask._id;
    await savedExecutorTask.save();

    // Сохраняем запись задачи
    await newTask.save();

    res.json({
      message:
        "Проект успешно добавлен, и сотрудник успешно добавлен к проекту",
    });
  } catch (error) {
    console.error(error, "Ошибка сервера");
  }
});

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
    console.error("Ошибка сервера:", error);
  }
});

router.delete("/delete/executorTask/:id", async (req, res) => {
  const executorTaskId = req.params.id;

  try {
    // Попытка найти и удалить задачу в промежуточной таблице ExecutorTaskModel
    const deletedExecutorTask = await ExecutorTaskModel.findByIdAndDelete(
      executorTaskId
    );

    if (!deletedExecutorTask) {
      return res.status(404).json({ message: "Задача не найдена" });
    }

    // Теперь нужно удалить связанную с этой задачей запись в модели TaskModel
    await TaskModel.findByIdAndDelete(deletedExecutorTask.taskId);

    res.json({ message: "Задача успешно удалена" });
  } catch (error) {
    console.error("Ошибка сервера при удалении задачи:", error);
  }
});

// Функция для проверки возможности изменения статуса задачи
function isStatusTransitionAllowed(currentStatus, newStatus) {
  return currentStatus !== newStatus;
}

router.put("/update/task/:id", async (req, res) => {
  const taskId = req.params.id;
  const { taskStatusId } = req.body;

  try {
    // Проверяем существование задачи по ID
    const existingTask = await ExecutorTaskModel.findById(taskId).populate(
      "taskId"
    );
    if (!existingTask) {
      return res.status(404).json({ message: "Задача не найдена" });
    }

    // Проверяем, можно ли изменить статус задачи на новый статус
    const isAllowed = isStatusTransitionAllowed(
      existingTask.taskId.taskStatusId,
      taskStatusId
    );

    if (!isAllowed) {
      return res
        .status(400)
        .json({ message: "Невозможно переместить задачу в данный статус" });
    }

    // Обновляем статус задачи
    existingTask.taskId.taskStatusId = taskStatusId;

    // Сохраняем обновленную задачу
    await existingTask.taskId.save();

    res.json({ message: "Статус задачи успешно обновлен" });
  } catch (error) {
    console.error("Ошибка сервера:", error);
  }
});

module.exports = router;
