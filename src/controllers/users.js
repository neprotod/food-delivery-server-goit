const User = require('../models/users');

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
            const user = await User.updateUser(req.params.id, req.body);
            
            if(!user){
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
     * Save user
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async createUser(req, res){
        try{
            const user = await User.saveUser(req.body);
            const result = {
                "status": "success",
                "user": user
            }
            res.status(201).json(result);
        }catch(e){
            console.error(e);
            //duplicate key
            if ( e.code === 11000 ) {
                return res.status(400).json({errors:['This user already exist']});
            }
            
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

            if(!user){
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