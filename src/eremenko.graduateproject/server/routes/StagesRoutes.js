const express = require('express');
const router = express.Router();
const StagesModel = require('../models/StagesModel');

// Получение этапа
router.get('/get/stages', (req, res) => {
    StagesModel.find()
        .then(stages => res.json(stages))
        .catch(err => res.json(err))
});

router.get('/getStages/:id', (req, res) => {
    const id = req.params.id
    StagesModel.findById({ _id: id })
        .then(post => res.json(post))
        .catch(err => console.log(err))
});

// Добавление этапа
router.post('/createStages', (req, res) => {
    StagesModel.create(req.body)
        .then(stages => res.json(stages))
        .catch(err => res.json(err))
});

// Удаление этапа
router.delete('/deleteStages/:id', (req, res) => {
    const id = req.params.id;
    StagesModel.findByIdAndDelete({ _id: id })
        .then(response => res.json(response))
        .catch(err => res.json(err))
});

module.exports = router;