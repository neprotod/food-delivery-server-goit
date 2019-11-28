const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)
const validationUtil = require('../utils/validation');

// Shema validation users
const validationShema = Joi.object({
    sku: Joi.number()
        .required(),
    name: Joi.string()
        .required(),
    description: Joi.string()
        .required(),
    price: Joi.number()
        .required(),
    currency: Joi.string()
        .alphanum()
        .uppercase()
        .required(),
    likes: Joi.number(),
    categories: Joi.array().items(
            Joi.objectId()
                .message('categories must be a ObjectId')
        )
        .unique()
        .required()
        
    
});


module.exports = {
    saveProduct(req, res, next){
        if(validationUtil.allValidation(req, res, validationShema))
            next();
    }
}