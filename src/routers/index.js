const {Router} = require('express');
const route = Router();

const products = require('./products.js');
const users = require('./users.js');

route.use('/products', products);
route.use('/users', users);

module.exports = route;