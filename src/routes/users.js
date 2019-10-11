const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router
    .route('/:id')
    .get(usersController.getUserById);

router
    .route('/login')
    .post(usersController.loginUser);

module.exports = router;