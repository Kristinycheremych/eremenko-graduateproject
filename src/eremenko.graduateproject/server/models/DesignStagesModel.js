const mongoose = require('mongoose');

const designStagesSchema = new mongoose.Schema({
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

const DesignStagesModel = mongoose.model("designStages", designStagesSchema);
module.exports = DesignStagesModel;