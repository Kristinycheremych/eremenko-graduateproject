const express = require("express");
const router = express.Router();
const ProjectModal = require("../models/ProjectModel");

// Получение проектов
router.get("/get/projects", (req, res) => {
  ProjectModal.find()
    .populate("statusProjectId")
    .populate("supervisorId")
    .then((projects) => res.json(projects))
    .catch((err) => res.json(err));
});

module.exports = router;