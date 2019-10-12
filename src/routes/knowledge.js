const express = require('express');
const router = express.Router();
const { getKnowledgeById, getKnowledgeTitles, createKnowledge } = require('../controllers/knowledge');

router
    .route('/:id')
    .get(getKnowledgeById);
router
    .route('/')
    .get(getKnowledgeTitles)
    .post(createKnowledge);

module.exports = router;
