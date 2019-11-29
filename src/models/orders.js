const mongoose = require('mongoose');

const User    = require('./users');
const Product = require('./products');

const Order = mongoose.model('orders',{
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        require: true
    },
    productsList: [{
        product:{
            type: mongoose.Types.ObjectId,
            ref: 'products',
            require: true
        },
        type: {
            type: String,
            require: true
        },
        itemsCount:{
            type: Number,
            default: 0,
            require: true
        }
    }],
    deliveryType: {
        type: String,
        required: true
    },
    deliveryAdress: {
        type: String,
        required: true
    },
    sumToPay: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});


/**
 * 
 */
module.exports = {
    /**
     * Save orders
     * 
     * @param  {Object} order order to save
     * @return {Object}      order
     */
    async saveOrder(orderParams){
        const order = new Order(orderParams);

        return await order.save();
    },

    /**
     * Get order by id
     * 
     * @param  {any} id id orders, we must pass this parametr in the type with which you want compare
     * @return {Object| null} order
     */
    async getOrderById(id){
        return await Order.findById(id)
            .populate('creator')
            .populate('productsList.product');
    }
}
