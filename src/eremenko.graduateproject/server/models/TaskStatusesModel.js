const mongoose = require('mongoose');

const TaskStatusesSchema = new mongoose.Schema({
    title: String,
    stageProjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stageProject'
    },
});

const TaskStatusesModel = mongoose.model("task_statuses", TaskStatusesSchema)
module.exports = TaskStatusesModel