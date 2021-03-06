const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router
    .route('/user/:id')
    .get(usersController.getUserById);

router
    .route('/login')
    .post(usersController.loginUser);

module.exports = router;