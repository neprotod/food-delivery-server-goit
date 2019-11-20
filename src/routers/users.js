const {Router} = require('express');
const route = Router();

const controllerUsers = require('../controllers/users');

route.post('/', controllerUsers.createUser);

route.get('/:id', controllerUsers.getUserById);

module.exports = route;