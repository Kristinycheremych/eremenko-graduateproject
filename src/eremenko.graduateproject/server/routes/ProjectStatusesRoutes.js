const express = require("express");
const router = express.Router();
const ProjectStatusesModel = require("../models/ProjectStatusesModel");

// Получение статуса проекта
router.get("/get/ProjectStatuses", (req, res) => {
  ProjectStatusesModel.find()
    .then((taskStatuses) => res.json(taskStatuses))
    .catch((err) => res.json(err));
});

module.exports = router;
