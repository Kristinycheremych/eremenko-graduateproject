const express = require("express");
const router = express.Router();
const ProjectStatusesModel = require("../models/ProjectStatusesModel");

// Получение статуса задачи
router.get("/get/ProjectStatuses", (req, res) => {
  ProjectStatusesModel.find()
    .then((taskStatuses) => res.json(taskStatuses))
    .catch((err) => res.json(err));
});

router.get("/getProjectStatuses/:id", (req, res) => {
  const id = req.params.id;
  ProjectStatusesModel.findById({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => console.log(err));
});

// Добавление статуса задачи
router.post("/createProjectStatuses", (req, res) => {
  ProjectStatusesModel.create(req.body)
    .then((taskStatuses) => res.json(taskStatuses))
    .catch((err) => res.json(err));
});

// Изменение статуса задачи
router.put("/updateProjectStatuses/:id", (req, res) => {
  const id = req.params.id;
  ProjectStatusesModel.findByIdAndUpdate(
    { _id: id },
    {
      title: req.body.title,
      description: req.body.description,
    }
  )
    .then((taskStatuses) => res.json(taskStatuses))
    .catch((err) => res.json(err));
});

// Удаление статуса задачи
router.delete("/deleteProjectStatuses/:id", (req, res) => {
  const id = req.params.id;
  ProjectStatusesModel.findByIdAndDelete({ _id: id })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

module.exports = router;
