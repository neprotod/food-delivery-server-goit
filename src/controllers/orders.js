const Joi = require('@hapi/joi');
const Product = require('../models/products');
const User = require('../models/users');
const Order = require('../models/orders');
const empty = require('is-empty');


module.exports = {
    /**
     * Save order
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async saveOrders(req, res){
        try{
            const result = {
                status: "success", 
                order: {}
            }

            const order = req.body;
            // It's need to save itemsCount then multiply price
            const itemsCount = {}
            // Get all products ids, it's need to count all pays
            const productsIds = order.productsList.map((item)=>{
                // Id it's key when we find a products
                itemsCount[item.product] = item.itemsCount;
                return item.product;
            });
            
            // Find all products
            const products = await Product.getProductsByIds(productsIds);

            let sumToPay = 0;
            products.forEach((item)=>{
                sumToPay += itemsCount[item._id.toString()] * item.price;
            });

            // We have normal sumToPay, add it in collection
            order.sumToPay = sumToPay;
            
            // Save order
            const saveOrder = await Order.saveOrder(order);

            result.order = saveOrder;
            
            res.status(201).json(result);
        }catch(e){
            res.status(500).json({errors:['Something wrong in database']});
        }
    },
    /**
     * Get order by id
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async getOrderById(req, res){
        const result = {
            status: "success", 
            order: {}
        }

        try{
            result.order = await Order.getOrderById(req.params.id);
            if(empty(result.order)){
                result.status = "No found";
                res.status(404).json(result);
            }

            res.status(200).json(result);
        }catch(e){
            console.error(e);
            res.status(500).json({errors:['Something wrong in database']});
        }
    }
}