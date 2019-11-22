const {Router} = require('express');
const route = Router();

const controllerOrders = require('../controllers/orders');

route.post('/', controllerOrders.saveOrders);
route.get('/:id', controllerOrders.getOrderById);


module.exports = route;