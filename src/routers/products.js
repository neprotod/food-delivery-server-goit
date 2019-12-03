const {Router} = require('express');
const route = Router();
const productsValidation = require('../validation/products');
const controllerProducts = require('../controllers/products');

route.post('/', productsValidation.saveProduct, controllerProducts.saveProduct);

route.put('/:id', productsValidation.updateProduct, controllerProducts.updateProduct);

route.get('/', controllerProducts.getProducts);

route.get('/:id', controllerProducts.getProduct);

module.exports = route;