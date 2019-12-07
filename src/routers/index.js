const {Router} = require('express');
const route = Router();

const products = require('./products');
const users = require('./users');
const orders = require('./orders');
const auth = require('./auth');
const comments = require('./сomments');

route.use('/products', products);
route.use('/users', users);
route.use('/orders', orders);
route.use('/auth', auth);
route.use('/comments', comments);

module.exports = route;