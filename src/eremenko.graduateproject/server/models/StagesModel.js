const mongoose = require('mongoose');

const stageSchema = new mongoose.Schema({
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

const StageModel = mongoose.model("stage", stageSchema);
module.exports = StageModel;