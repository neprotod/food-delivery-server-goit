const {Router} = require('express');
const route = Router();
const productsValidation = require('../validation/products');
const controllerProducts = require('../controllers/products');

route.post('/', productsValidation.saveProduct, controllerProducts.saveProducts);

route.get('/', controllerProducts.getProducts);

route.get('/:id', controllerProducts.getProduct);

module.exports = route;