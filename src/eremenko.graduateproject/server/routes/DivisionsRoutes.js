const express = require("express");
const router = express.Router();
const DivisionsModal = require("../models/DivisionsModal");

// Получение подразделения
router.get("/get/divisions", (req, res) => {
  DivisionsModal.find()
    .then((divisions) => res.json(divisions))
    .catch((err) => res.json(err));
});


module.exports = router;
