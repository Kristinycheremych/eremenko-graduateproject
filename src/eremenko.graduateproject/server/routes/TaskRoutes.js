const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const TaskModel = require("../models/TaskModel");

// Получение задач для конкретного этапа проекта
router.get("/get/tasksz/:stageProjectId", async (req, res) => {
  try {
    const tasks = await TaskModel.find({
      stageProjectId: new mongoose.Types.ObjectId(req.params.stageProjectId),
    });
    res.json(tasks);
  } catch (error) {
    console.error("Ошибка сервера:", error);
  }
});

module.exports = router;
