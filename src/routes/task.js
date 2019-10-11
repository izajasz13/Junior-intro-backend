const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');

router
    .route('/task')
    .get(taskController.getTaskById);

module.exports = router;