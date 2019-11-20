const Joi = require('@hapi/joi');
const nanoid = require('nanoid');
const {getMessages} = require('../utils/validation');
const productsModel = require('../models/products');
const ordersModel = require('../models/orders');


// Shema validation orders
const validationOrderShema = Joi.object({
    user: Joi.string()
        .required(),

    products: Joi.array()
        .required(),

    deliveryType: Joi.string()
        .lowercase()
        .pattern(/^delivery$/)
        .required(),

    deliveryAdress: Joi.string()
        .required()
});

module.exports = {
    /**
     * Save order
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async setOrders(req, res){
        
        const validation = validationOrderShema.validate(req.body);

        // Get all errors validation
        const errorMessage = getMessages(validation);
        if(errorMessage){
            console.log(validation.error);
            return res.status(400).json(errorMessage);
        }
        // This order is valid
        let order = validation.value;

        // Get all products by ids
        const findProducts = await productsModel.getProductsByIds(order.products);

        // We have to by sure to order products = findProducts
        if(findProducts.length !== order.products.length){
            // This order is incorrect, calculate the difference
            const productIds =  findProducts.map((elem)=>(elem.id));

            const different = order.products.filter((ids)=>{
                if(!productIds.includes(ids)){
                    return true;
                }
            });

            const result = {
                status: 'failed', 
                order: null,
                noProduct: different
            }
            return res.status('404').json(result);
            
        }

        // Everything is ok, formatting and response
        order = {id: nanoid(), ...order};

        const result = {
            status: 'success',
            order
        }
        // Save this order
        try{
            if(await ordersModel.saveOrder(order)){
                res.status(201).json(result);
            }else{
                throw new Error('Something go wrong');
            }
        }catch(e){
            console.error(e);
            return res.status('400').end('Something go wrong');
        }
    },
    /**
     * Get order by id
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async getOrders(req, res){
        try{
            const id = req.params.id;
            const order = await ordersModel.getOrderById(id);
            if(order)
                return res.status(200).json(order);
        }catch(e){
            console.error(e);
        }
        res.status(404).end("We couldn't find order");
    }
}