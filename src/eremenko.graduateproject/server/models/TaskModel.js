const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    stageProjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stageProject'
    },
    taskStatusId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task_statuses' // Ссылка на модель статуса задачи
    },
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'  // Ссылка на модель пользователей
    }]
});

const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = TaskModel;