const mongoose = require('mongoose');
const Joi = require('joi');

const knowledgeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 4
    },
    knowledgeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Knowledge',
        required: true
    }
});

const Knowledge = mongoose.model('KnowledgeList', knowledgeSchema);

function validateKnowledge(knowledge){
    const schema = {
        title: Joi.string().min(4).required(),
        knowledgeId: Joi.object().required()
    }
    return Joi.validate(knowledge, schema)

};

exports.knowledgeSchema = knowledgeSchema;
exports.validateKnowledge = validateKnowledge;
exports.Knowledge = Knowledge;
