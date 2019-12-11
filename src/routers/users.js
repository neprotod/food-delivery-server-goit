const {Router} = require('express');
const route = Router();
const userValidation = require('../validation/users');

const controllerUsers = require('../controllers/users');

route.get('/:id', controllerUsers.getUserById);

// update user
route.put('/:id', userValidation.updateUser, controllerUsers.updateUser);

module.exports = route;