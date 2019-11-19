const {Router} = require('express');
const route = Router();

const controllerUsers = require('../controllers/users');

route.post('/', controllerUsers.setUser);

route.get('/:id', controllerUsers.getUser);

module.exports = route;