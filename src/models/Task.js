const mongoose = require('mongoose');
const Joi = require('joi');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 4
    },
    description: {
        type: String,
        required: true
    },
    coins: {
        type: Number,
        required: true
    },
    exp: {
        type: Number,
        required: true
    },
    question: [String],
    answers: [{number: Number, content: String, isCorrect: Boolean}]
});

const Task = mongoose.model('Task', taskSchema);

function validateTask(task){
    const schema = {
        title: Joi.string().min(4).required(),
        description: Joi.string().required(),
        coins: Joi.number().required(),
        exp: Joi.number().required()
    }
    return Joi.validate(task, schema)
};

exports.taskSchema = taskSchema;
exports.validateTask = validateTask;
exports.Task = Task;