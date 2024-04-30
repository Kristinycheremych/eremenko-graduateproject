const express = require("express");
const router = express.Router();
const TaskStatusesModel = require("../models/TaskStatusesModel");

// Получение статусов задач по ID этапа проекта

router.get("/get/taskStatuses", (req, res) => {
  TaskStatusesModel.find()
    .then((taskStatuses) => res.json(taskStatuses))
    .catch((err) => res.json(err));
});


module.exports = router;
