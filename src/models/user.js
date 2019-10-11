const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 16
    },
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    currentTask: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    },
    coins: {
        type: Number,
        required: true
    },
    experience: {
        type: Number,
        required: true
    }
})

const User = mongoose.model('User', userSchema, 'users');

function validateUser(user) {
    const schema = {
        username: Joi.string().min(4).max(16).required(),
        name: Joi.string().min(4).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(255).required(),
        currentTask: Joi.array().items(Joi.string()),
        coins: Joi.number().required(),
        experience: Joi.number().required()
    }
    return Joi.validate(user, schema);
}


exports.userSchema = userSchema;
exports.validate = validateUser;
exports.User = User;