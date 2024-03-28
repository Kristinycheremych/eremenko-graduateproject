const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');
const ProjectStatusesModel = require('./models/ProjectStatuses');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/test")
    .then(db => console.log('База данных подключена'))
    .catch(error => console.log(error))

// Получение
app.get('/', (req, res) => {
    UserModel.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.get('/get/projectStatuses', (req, res) => {
    ProjectStatusesModel.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.get('/get/:id', (req, res) => {
    const id = req.params.id
    UserModel.findById({ _id: id })
        .then(post => res.json(post))
        .catch(err => console.log(err))
})

app.get('/getProjectStatuses/:id', (req, res) => {
    const id = req.params.id
    ProjectStatusesModel.findById({ _id: id })
        .then(post => res.json(post))
        .catch(err => console.log(err))
})

// Добавление

app.post('/create', (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err))
})

app.post('/createProjectStatuses', (req, res) => {
    ProjectStatusesModel.create(req.body)
        .then(projectStatuses => res.json(projectStatuses))
        .catch(err => res.json(err))
})

// Изменение
app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({ _id: id }, {
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        position: req.body.position,
        isActive: req.body.isActive
    }).then(user => res.json(user))
        .catch(err => res.json(err))
})

app.put('/updateProjectStatuses/:id', (req, res) => {
    const id = req.params.id;
    ProjectStatusesModel.findByIdAndUpdate({ _id: id }, {
        title: req.body.title,
        description: req.body.description
    }).then(user => res.json(user))
        .catch(err => res.json(err))
})

// Удаление
app.delete('/deleteuser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({ _id: id })
        .then(response => res.json(response))
        .catch(err => res.json(err))
})

app.delete('/deleteProjectStatuses/:id', (req, res) => {
    const id = req.params.id;
    ProjectStatusesModel.findByIdAndDelete({ _id: id })
        .then(response => res.json(response))
        .catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log('Сервер запущен');
})