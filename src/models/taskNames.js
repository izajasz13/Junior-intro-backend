const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskNamesSchema = new Schema({
    number: {
        type: Number,
        require: true
    },

    name: {
        type: String,
        required: true,
        unique: true
    },

    taskId: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
        unique: true
    },

    section: {
        type: Number,
        required: true
    }
});

exports.taskName = mongoose.model('taskName', taskNamesSchema);
