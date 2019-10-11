const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');

router
    .route('/task/:id')
    .get(taskController.getTaskById);

module.exports = router;