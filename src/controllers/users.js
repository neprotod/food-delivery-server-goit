const User = require('../models/users');
const empty = require('is-empty');

module.exports = {
    /**
     * Update user
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async updateUser(req, res){
        const result = {
            status: "success", 
            user: {}
        }
        try{
            const user = await User.updateUserById(req.params.id, req.body);
            
            if(empty(user)){
                return res.status(400).json({errors:["User doesn't exist"]})
            }
            result.user = user;
            res.status(200).json(result);
        }catch(e){
            console.error(e);
            res.status(500).json({errors:['Something wrong in database']});
        }
    },
    /**
     * Get one user by id
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async getUserById(req, res){
        try{
            const user = await User.getUserById(req.params.id);
            
            const result = {
                "status": "success",
                "user": user
            }

            if(empty(user)){
                result.status = "not found";
                return res.status(404).json(result);
            }

            res.status(200).json(result);
        }catch(e){
            console.error(e);
            res.status(500).json({errors:['Something wrong in database']});
        }
    }
}