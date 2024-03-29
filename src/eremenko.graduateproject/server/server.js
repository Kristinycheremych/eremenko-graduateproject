const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');
const ProjectStatusesModel = require('./models/ProjectStatuses');
const TaskStatusesModel = require('./models/TaskStatuses');
const EmployeeStatusModel = require('./models/EmployeeStatus');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Project_Management")
    .then(db => console.log('База данных подключена'))
    .catch(error => console.log(error))

// Получение сотрудников
app.get('/', (req, res) => {
    UserModel.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
})
// Получение статуса проекта
app.get('/get/projectStatuses', (req, res) => {
    ProjectStatusesModel.find()
        .then(projectStatuses => res.json(projectStatuses))
        .catch(err => res.json(err))
})
// Получение статуса задачи
app.get('/get/taskStatuses', (req, res) => {
    TaskStatusesModel.find()
        .then(taskStatuses => res.json(taskStatuses))
        .catch(err => res.json(err))
});
// Получение статуса сотрудника
app.get('/get/employeeStatus', (req, res) => {
    EmployeeStatusModel.find()
        .then(employeeStatus => res.json(employeeStatus))
        .catch(err => res.json(err))
});

app.get('/get/:id', (req, res) => {
    const id = req.params.id
    UserModel.findById({ _id: id })
        .then(post => res.json(post))
        .catch(err => console.log(err))
});

app.get('/getTaskStatuses/:id', (req, res) => {
    const id = req.params.id
    TaskStatusesModel.findById({ _id: id })
        .then(post => res.json(post))
        .catch(err => console.log(err))
});

app.get('/getProjectStatuses/:id', (req, res) => {
    const id = req.params.id
    ProjectStatusesModel.findById({ _id: id })
        .then(post => res.json(post))
        .catch(err => console.log(err))
});

app.get('/getEmployeeStatus/:id', (req, res) => {
    const id = req.params.id
    EmployeeStatusModel.findById({ _id: id })
        .then(post => res.json(post))
        .catch(err => console.log(err))
});

// Добавление сотрудника
app.post('/create', (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err))
});
// Добавление статуса проекта
app.post('/createProjectStatuses', (req, res) => {
    ProjectStatusesModel.create(req.body)
        .then(projectStatuses => res.json(projectStatuses))
        .catch(err => res.json(err))
})
// Добавление статуса задачи
app.post('/createTaskStatuses', (req, res) => {
    TaskStatusesModel.create(req.body)
        .then(taskStatuses => res.json(taskStatuses))
        .catch(err => res.json(err))
});
// Добавление статуса сотрудника
app.post('/createEmployeeStatus', (req, res) => {
    EmployeeStatusModel.create(req.body)
        .then(employeeStatus => res.json(employeeStatus))
        .catch(err => res.json(err))
});

// Изменение сотрудников
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
});
// Изменение статуса проекта
app.put('/updateProjectStatuses/:id', (req, res) => {
    const id = req.params.id;
    ProjectStatusesModel.findByIdAndUpdate({ _id: id }, {
        title: req.body.title,
        description: req.body.description
    }).then(projectStatuses => res.json(projectStatuses))
        .catch(err => res.json(err))
});
// Изменение статуса задачи
app.put('/updateTaskStatuses/:id', (req, res) => {
    const id = req.params.id;
    TaskStatusesModel.findByIdAndUpdate({ _id: id }, {
        title: req.body.title,
        description: req.body.description
    }).then(taskStatuses => res.json(taskStatuses))
        .catch(err => res.json(err))
});
// Изменение статуса сотрудника
app.put('/updateEmployeeStatus/:id', (req, res) => {
    const id = req.params.id;
    EmployeeStatusModel.findByIdAndUpdate({ _id: id }, {
        title: req.body.title,
        description: req.body.description
    }).then(employeeStatus => res.json(employeeStatus))
        .catch(err => res.json(err))
});

// Удаление сотрудника
app.delete('/deleteuser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({ _id: id })
        .then(response => res.json(response))
        .catch(err => res.json(err))
})
// Удаление статуса проекта
app.delete('/deleteProjectStatuses/:id', (req, res) => {
    const id = req.params.id;
    ProjectStatusesModel.findByIdAndDelete({ _id: id })
        .then(response => res.json(response))
        .catch(err => res.json(err))
})
// Удаление статуса задачи
app.delete('/deleteTaskStatuses/:id', (req, res) => {
    const id = req.params.id;
    TaskStatusesModel.findByIdAndDelete({ _id: id })
        .then(response => res.json(response))
        .catch(err => res.json(err))
});
// Удаление статуса сотрудника
app.delete('/deleteEmployeeStatus/:id', (req, res) => {
    const id = req.params.id;
    EmployeeStatusModel.findByIdAndDelete({ _id: id })
        .then(response => res.json(response))
        .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log('Сервер запущен');
})