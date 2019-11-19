const {Router} = require('express');
const route = Router();

const controllerProducts = require('../controllers/products');

route.get('/',    controllerProducts.getProducts);

route.get('/:id', controllerProducts.getProduct);

module.exports = route;