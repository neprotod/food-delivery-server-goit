const {Router} = require('express');
const route = Router();

const products = require('./products');
const users = require('./users');
const orders = require('./orders');
const auth = require('./auth');

route.use('/products', products);
route.use('/users', users);
route.use('/orders', orders);
route.use('/auth', auth);

module.exports = route;