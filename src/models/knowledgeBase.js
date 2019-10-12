const mongoose = require('mongoose');
const Joi = require('joi');

const knowledgeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 4
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const Knowledge = mongoose.model('Knowledge', knowledgeSchema);

function validateKnowledge(knowledge){
    const schema = {
        title: Joi.string().min(4).required(),
        description: Joi.string().required(),
        content: Joi.string().required()
    }
    return Joi.validate(knowledge, schema)

};

exports.knowledgeSchema = knowledgeSchema;
exports.validateKnowledge = validateKnowledge;
exports.Knowledge = Knowledge;