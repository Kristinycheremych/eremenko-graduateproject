const express = require("express");
const router = express.Router();
const PositionModal = require("../models/PositionModal");

// Получение должности
router.get("/get/position", (req, res) => {
  PositionModal.find()
    .then((positions) => res.json(positions))
    .catch((err) => res.json(err));
});

module.exports = router;
