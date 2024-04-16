const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    startDate: Date,
    endDate: Date,
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project_statuses' // ссылка на модель статусов проектов
    },
    employees: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users' // ссылка на модель сотрудников
    }]
});

const ProjectModel = mongoose.model("project", projectSchema)
module.exports = ProjectModel