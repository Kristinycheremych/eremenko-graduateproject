const mongoose = require('mongoose');

const SPDStageSchema = new mongoose.Schema({
    title: String,
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
    },
    tasks: [{
        title: String,
        description: String,
        employees: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users' // ссылка на модель сотрудников
        }]
    }]
});

const SPDStageModal = mongoose.model("SPDStage", SPDStageSchema);
module.exports = SPDStageModal;