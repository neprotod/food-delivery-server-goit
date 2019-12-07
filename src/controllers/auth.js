const empty = require('is-empty');
const bcrypt = require('bcrypt');
const User = require('../models/users');

module.exports = {
    /**
     * Current user
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async current(req, res){
        try{
            const data = await User.getUserById(req.user._id);
            const user = data.toObject();
            
            delete user.tokens;
            delete user.password;

            res.status(200).json(user);
        }catch(e){
            console.error(e);
            res.status(400).json({errors:['Wrong opperation']});
        }
    },
     /**
     * Logout user
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async logout(req, res){
        try{
            // Unset token
            req.user.tokens = req.user.tokens.filter((elem)=>{
                if(elem.token !== req.token){
                    return elem;
                }
            });

            req.user.save();
            
            res.status(200).json('You are logout');
        }catch(e){
            res.status(400).json({errors:['Wrong opperation']});
        }
    },
     /**
     * Login user
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async login(req, res){
        const auth = req.header('authorization');
        
        if(auth){
            return res.status(400).json({errors:["You're already auth"]});
        }
        const user = await User.getLogin(req.body.username);

        if(empty(user)){
            res.status(400).json({errors:["Not user with this username"]});
        }

        // Test password
        const test = await bcrypt.compare(req.body.password, user['password']);
        
        if(!test){
            res.status(400).json({errors:["Password wrong"]});
        }

        // Everything is ok, create token
        const token = await user.generateAuthToken();
        res.set('X-Auth-Token', token);

        res.status(200).json({token});
    },
    /**
     * Save user
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async register(req, res){
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
    }
}