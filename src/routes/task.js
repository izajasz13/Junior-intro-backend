const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');

router
    .route('/task/:id')
    .get(taskController.getTaskById);

router
    .route('/task/create')
    .post(taskController.createTask);

router
    .route('/task/update')
    .post(taskController.updateTask);

module.exports = router;