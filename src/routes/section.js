const express = require('express');
const router = express.Router();
const {getTasksFromSection} = require('../controllers/section');

router
    .route('/:sectionId')
    .get(getTasksFromSection);

module.exports = router;
