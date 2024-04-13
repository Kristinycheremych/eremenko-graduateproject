const mongoose = require('mongoose');

const StageProjectSchema = new mongoose.Schema({
    stageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stage' // ссылка на модель статусов проектов
    },
    description: String,
    startDate: Date,
    endDate: Date,
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
    },
    employees: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users' // ссылка на модель сотрудников
    }]
});

const StageProjectModal = mongoose.model("stageProject", StageProjectSchema)
module.exports = StageProjectModal
