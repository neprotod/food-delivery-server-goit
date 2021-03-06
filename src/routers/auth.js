const {Router} = require('express');
const userValidation = require('../validation/users');
const route = Router();

const controller = require('../controllers/auth');
const {authentication} = require('../middlewares/auth');

route.get('/current', authentication, controller.current);
route.get('/logout', authentication, controller.logout);
route.post('/login', userValidation.loginUser, controller.login);

route.post('/register', userValidation.saveUser, controller.register);


module.exports = route;