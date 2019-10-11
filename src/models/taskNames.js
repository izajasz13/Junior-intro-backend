const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskNamesSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    taskId: {
        type: Schema.Types.ObjectId,
        ref: 'task',
        required: true,
        unique: true
    },

    section: {
        type: Number,
        required: true
    }
});

export default mongoose.model('taskName', taskNamesSchema);
