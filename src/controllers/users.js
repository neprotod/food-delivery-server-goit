const Joi = require('@hapi/joi');
const nanoid = require('nanoid');
const usersModel = require('../models/users');
const {getMessages} = require('../utils/validation');

// Shema validation users
const validationUserShema = Joi.object({
    username: Joi.string()
        .required(),

    telephone: Joi.string()
        .required(),

    password: Joi.string()
        .required(),

    email: Joi.string()
        .email()
        .required()
});


module.exports = {
    /**
     * Save user
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async setUser(req, res){
        const validation = validationUserShema.validate(req.body);
        // Get all errors validation
        const errorMessage = getMessages(validation);
        if(errorMessage){
            console.log(validation.error);
            return res.status(400).json(errorMessage);
        }

        const user = {id: nanoid(), ...validation.value};

        if(await usersModel.saveUser(user)){
            const result = {
                "status": "success",
                "user": user
            }
            res.status(201).json(result);
        }else{
            res.status(400).end('Something went wrong');
        }
    },
    /**
     * Get one user by id
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async getUser(req, res){
        const user = await usersModel.getUserById(req.params.id);
        
        const result = {
            "status": "success",
            "user": user
        }

        if(!user){
            result.status = "not found";
            res.status(404).json(result);
        }

        res.status(200).json(result);
    }
}