const mongoose = require('mongoose');

const IntegrationStageSchema = new mongoose.Schema({
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

const IntegrationStageModal = mongoose.model("integrationStage", IntegrationStageSchema);
module.exports = IntegrationStageModal;