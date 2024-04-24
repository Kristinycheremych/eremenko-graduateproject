const express = require("express");
const router = express.Router();
const StageModal = require("../models/StageModel");

// Получение этапа
router.get("/get/stage", (req, res) => {
  StageModal.find()
    .then((stages) => res.json(stages))
    .catch((err) => res.json(err));
});

module.exports = router;
