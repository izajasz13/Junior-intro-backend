const mongoose = require('mongoose');
const Joi = require('joi');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 4
    },

    number: {
        type: Number,
        required:true
    },

    description: {
        type: String,
        required: true
    },
    nextTask: {
        type: String,
        default: null,
    },
    coins: {
        type: Number,
        required: true
    },
    exp: {
        type: Number,
        required: true
    },
    questions: [String],
    answers: [{number: Number, content: String, isCorrect: Boolean}]

});

const Task = mongoose.model('Task', taskSchema, 'Task');

function validateTask(task){
    const schema = {
        title: Joi.string().min(4).required(),
        description: Joi.string().required(),
        nextTask: Joi.string(),
        coins: Joi.number().required(),
        exp: Joi.number().required(),
        questions: Joi.array().required(),
        answers: Joi.array(),
        number: Joi.required()
    }
    return Joi.validate(task, schema)

};

exports.taskSchema = taskSchema;
exports.validateTask = validateTask;
exports.Task = Task;