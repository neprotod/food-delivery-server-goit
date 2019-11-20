const {Router} = require('express');
const route = Router();

const controllerOrders = require('../controllers/orders');

route.post('/', controllerOrders.setOrders);
route.get('/:id', controllerOrders.getOrders);


module.exports = route;