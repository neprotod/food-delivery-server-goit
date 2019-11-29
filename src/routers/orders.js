const {Router} = require('express');
const route = Router();

const ordersValidation = require('../validation/orders');
const controllerOrders = require('../controllers/orders');

route.post('/', ordersValidation.saveOrders, controllerOrders.saveOrders);
route.get('/:id', controllerOrders.getOrderById);


module.exports = route;