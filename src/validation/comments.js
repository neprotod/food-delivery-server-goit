const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)
const validationUtil = require('../utils/validation');

// Shema validation users
const validationShema = Joi.object({
    product: Joi.objectId().message('Product must be a ObjectId').required(),
    author:  Joi.objectId().message('Author must be a ObjectId').required(),
    text: Joi.string().required(),
    mark: Joi.number()
});


module.exports = {
    saveComment(req, res, next){
        if(validationUtil.allValidation(req, res, validationShema))
            next();
    }
}