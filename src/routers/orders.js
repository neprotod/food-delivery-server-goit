const {Router} = require('express');
const route = Router();

const ordersValidation = require('../validation/orders');
const controllerOrders = require('../controllers/orders');
const {authentication} = require('../middlewares/auth');

route.post('/', authentication, 
                ordersValidation.saveOrders, 
                controllerOrders.saveOrders);
                
route.get('/:id', controllerOrders.getOrderById);


module.exports = route;