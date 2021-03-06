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
    nextTask: {
        type: String,
        default: '',
    },
    coins: {
        type: Number,
        required: true
    },
    exp: {
        type: Number,
        required: true
    },
    questions: [{
        question: String,
        answers: [{
            number: Number,
            content: String
        }]
    }],
    answers: [Number]
});

const Task = mongoose.model('Task', taskSchema, 'Task');

function validateTask(task){
    const schema = {
        title: Joi.string().min(4).required(),
        description: Joi.string().required(),
        nextTask: Joi.string().allow(''),
        coins: Joi.number().required(),
        exp: Joi.number().required(),
        questions: Joi.array().required(),
        answers: Joi.array(),
    }
    return Joi.validate(task, schema)

};

exports.taskSchema = taskSchema;
exports.validateTask = validateTask;
exports.Task = Task;