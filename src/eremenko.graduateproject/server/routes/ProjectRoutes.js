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

router.get("/getProjects/:id", (req, res) => {
  const id = req.params.id;
  ProjectModal.findOne({ _id: id })
    .populate("statusProjectId")
    .populate({
      path: "supervisorId",
      populate: { path: "position" },
    })
    .populate({
      path: "supervisorId",
      populate: {
        path: "employeeStatus"
      }
    })
    .then((project) => res.json(project))
    .catch((err) => res.json(err));
});

// Добавление проектов
router.post("/createProject", (req, res) => {
  const { title, description, startDate, endDate, statusProjectId, supervisorId } =
    req.body;
  const newProject = new ProjectModal({
    title,
    description,
    startDate,
    endDate,
    statusProjectId,
    supervisorId,
  });
  newProject
    .save()
    .then((project) => res.json(project))
    .catch((err) => res.json(err));
});

// Изменение проектов
router.put("/updateProject/:id", (req, res) => {
  const id = req.params.id;
  ProjectModal.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      statusProjectId: req.body.statusProjectId,
      supervisorId: req.body.supervisorId,
    },
    { new: true }
  )
    .then((updatedProject) => res.json(updatedProject))
    .catch((err) => res.json(err));
});

// Удаление проекта
router.delete("/deleteProject/:id", (req, res) => {
  const id = req.params.id;
  ProjectModal.findByIdAndDelete({ _id: id })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

// Маршрут для удаления сотрудника из проекта
router.delete("/deleteEmployee/:projectId/:employeeId", (req, res) => {
  const { projectId, employeeId } = req.params;

  ProjectModal.findByIdAndUpdate(
    projectId,
    { $pull: { supervisorId: employeeId } }, // Удаляем сотрудника из массива employees
    { new: true }
  )
    .populate("supervisorId") // Подставьте имя поля для связи с таблицей сотрудников
    .then((project) => res.json(project))
    .catch((err) => res.json(err));
});

module.exports = router;