const express = require('express');
const router = express.Router();
const StageModal = require('../models/StageModel');

// Получение статуса проекта
router.get('/get/stage', (req, res) => {
    StageModal.find()
        .then(stages => res.json(stages))
        .catch(err => res.json(err))
});

router.get('/get/stage/:id', (req, res) => {
    const id = req.params.id
    StageModal.findById({ _id: id })
        .then(post => res.json(post))
        .catch(err => console.log(err))
});

// Добавление статуса проекта
router.post('/create/stage', (req, res) => {
    StageModal.create(req.body)
        .then(stages => res.json(stages))
        .catch(err => res.json(err))
})

// Изменение статуса проекта
router.put('/update/stage/:id', (req, res) => {
    const id = req.params.id;
    StageModal.findByIdAndUpdate({ _id: id }, {
        title: req.body.title,
        description: req.body.description
    }).then(stages => res.json(stages))
        .catch(err => res.json(err))
});

// Удаление статуса проекта
router.delete('/delete/stage/:id', (req, res) => {
    const id = req.params.id;
    StageModal.findByIdAndDelete({ _id: id })
        .then(response => res.json(response))
        .catch(err => res.json(err))
});

module.exports = router;