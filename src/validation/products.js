const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)
const validationUtil = require('../utils/validation');
const empty = require('is-empty');

// Shema validation users
const validationShema = Joi.object({
    sku: Joi.number(),
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    currency: Joi.string()
        .alphanum()
        .uppercase(),
    likes: Joi.number(),
    categories: Joi.array().items(
            Joi.objectId()
                .message('categories must be a ObjectId')
        )
        .unique()
        
    
});


module.exports = {
    saveProduct(req, res, next){
        if(validationUtil.allValidation(req, res, validationShema, {presence: 'required'}))
            next();
    },

    updateProduct(req, res, next){
        if(empty(req.body)){
            return res.status('400').json({errors:['No data']});
        }
        
        if(validationUtil.allValidation(req, res, validationShema))
            next();
    }
}