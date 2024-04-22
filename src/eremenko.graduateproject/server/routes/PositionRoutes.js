const express = require("express");
const router = express.Router();
const PositionModal = require("../models/PositionModal");

// Получение статуса проекта
router.get("/get/position", (req, res) => {
  PositionModal.find()
    .then((positions) => res.json(positions))
    .catch((err) => res.json(err));
});

router.get("/getPosition/:id", (req, res) => {
  const id = req.params.id;
  PositionModal.findById({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => console.log(err));
});

// Добавление статуса проекта
router.post("/createPositions", (req, res) => {
  PositionModal.create(req.body)
    .then((positions) => res.json(positions))
    .catch((err) => res.json(err));
});

// Изменение статуса проекта
router.put("/updatePositions/:id", (req, res) => {
  const id = req.params.id;
  PositionModal.findByIdAndUpdate(
    { _id: id },
    {
      title: req.body.title,
    }
  )
    .then((positions) => res.json(positions))
    .catch((err) => res.json(err));
});

// Удаление статуса проекта
router.delete("/deletePositions/:id", (req, res) => {
  const id = req.params.id;
  PositionModal.findByIdAndDelete({ _id: id })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

module.exports = router;
