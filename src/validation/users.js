const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)
const validationUtil = require('../utils/validation');
const empty = require('is-empty');

const optioanlFields = {
    username: Joi.string()
        .trim()
        .pattern(/^[a-zA-Z ]+$/)
        .message('Invalid username'),
    telephone: Joi.string()
        .pattern(/^\+?[0-9 ]+$/)
        .message('Invalid telephone'),
    password: Joi.string()
        .min(4),
    email: Joi.string()
        .email()
}

const requiredFields = {
    username: optioanlFields.username.required(),
    telephone: optioanlFields.telephone.required(),
    password: optioanlFields.password.required(),
    email: optioanlFields.email.required()
}


// Shema validation users
const validationShema = Joi.object({
    // ids products
    favoriteProducts: Joi.array()
        .items(Joi.objectId())
        .unique(),
    // ids products
    viewedProducts:Joi.array()
        .items(Joi.objectId())
        .unique(),
    // ids orders
    orders:Joi.array()
        .items(Joi.objectId())
        .unique()
});

module.exports = {
    saveUser(req, res, next){
        // Use required field
        const shema = validationShema.keys(requiredFields);
        if(validationUtil.allValidation(req, res, shema))
            next();
    },
    updateUser(req, res, next){
        if(empty(req.body)){
            return res.status('400').json({errors:['No data']});
        }
        
        // Use optional field
        const shema = validationShema.keys(optioanlFields);
        if(validationUtil.allValidation(req, res, shema))
            next();
    }
}