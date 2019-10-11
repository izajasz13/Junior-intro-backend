const express = require('express');
const router = express.Router();
const { getKnowledgeById } = require('../controllers/knowledge');

router
    .route('/:id')
    .get(getKnowledgeById);

module.exports = router;
