const {Router} = require('express');
const userValidation = require('../validation/users');
const route = Router();

const controller = require('../controllers/auth');

route.post('/login', userValidation.loginUser, controller.login);

route.post('/register', userValidation.saveUser, controller.register);


module.exports = route;