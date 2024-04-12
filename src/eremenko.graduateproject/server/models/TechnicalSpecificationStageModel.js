const mongoose = require('mongoose');

const TechnicalSpecificationStageSchema = new mongoose.Schema({
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

const TechnicalSpecificationStageModel = mongoose.model("technicalSpecificationStage", TechnicalSpecificationStageSchema);
module.exports = TechnicalSpecificationStageModel;