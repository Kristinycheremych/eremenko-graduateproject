const mongoose = require('mongoose');

const ProjectStagesSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project' // ссылка на модель проекта
    },
    stageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stages' // ссылка на модель этапов проекта
    }
});

const ProjectStagesModel = mongoose.model("projectStages", ProjectStagesSchema)
module.exports = ProjectStagesModel