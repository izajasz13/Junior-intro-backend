const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router
    .route('/user/:id')
    .get(usersController.getUserById)
    .put(usersController.updateUser)
    .delete(usersController.removeUser);

module.exports = router;