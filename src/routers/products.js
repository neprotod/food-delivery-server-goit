const {Router} = require('express');
const controllerProducts = require('../controllers/products');
const route = Router();

route.get('/', controllerProducts.getProducts);

route.get('/:id', controllerProducts.getProduct);

module.exports = route;
