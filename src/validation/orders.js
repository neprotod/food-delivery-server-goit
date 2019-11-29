const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)
const validationUtil = require('../utils/validation');

const optioanlFields = {

}

// Shema validation users
const validationShema = Joi.object({
    creator: Joi.objectId(),
    productsList: Joi.array().items(Joi.object({
            product: Joi.objectId()
                    .required(),
            type: Joi.string()
                    .uppercase()
                    .valid("M", "XL", "XXL")
                    .required(),
            itemsCount: Joi.number()
                    .required()
        })),
    deliveryType: Joi.string()
                    .lowercase()
                    .valid("delivery", "office"),
    deliveryAdress: Joi.string(),
    sumToPay: Joi.number().optional(),
    status: Joi.string()
                    .valid("inProgress", "declined", "finished", "failed")
});


module.exports = {
    saveOrders(req, res, next){
        if(validationUtil.allValidation(req, res, validationShema, {presence: 'required'}))
            next();
    }
}