const {Router} = require('express');
const route = Router();

const products = require('./products.js');

route.use('/products', products);

module.exports = route;