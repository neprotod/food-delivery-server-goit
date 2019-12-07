const mongoose = require('mongoose');
const empty = require('is-empty');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');

// Models
const Order = require('./orders');
const Product = require('./products');

const Schema = mongoose.Schema;

const userShema = new Schema({
    username: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    favoriteProducts: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref:  'products'
        }],
        default: []
    },
    viewedProducts: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref:  'products'
        }],
        default: []
    },
    orders: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref:  'orders'
        }],
        default: []
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
});

userShema.index({email: 1}, {unique: true});

// Authorization token
userShema.methods.generateAuthToken = async function (){
    const user = this;
    
    // Create signature
    const token = jwt.sign({id: user._id.toString()}, config.jwt_secret, {expiresIn: config.jwt_expire});
    
    // Save in all tokens
    user.tokens = user.tokens.concat({token});
    await user.save();

    return token;
}


// Hash the plain text password before saving
userShema.pre('save', async function(next){
    const user = this;

    if(user.isModified('password')){
        user['password'] = await bcrypt.hash(user['password'], 8);
    }
    next();
});

const User = mongoose.model('users', userShema);

module.exports = {
    /**
     * Update user
     * 
     * @param  {number} id   user id
     * @param  {Object} user user fields to update
     * @return {Object}      user
     */
    async updateUserById(id, userParams){
        const user = await User.findById(id);

        if(empty(user))
            return user;
        
        const updates = Object.keys(userParams);

        updates.forEach((update)=> (user[update] = userParams[update]));

        // We use save, becouse findByUpdate too bad work in db.pre()
        return await user.save();
    },
    /**
     * Save user
     * 
     * @param  {Object} user user to save
     * @return {Object}      user
     */
    async saveUser(userParams){
        const user = new User(userParams);
        return user.save();
    },

    /**
     * Get user by id
     * 
     * @param  {any} id id users, we must pass this parametr in the type with which you want compare
     * @return {Object} user
     */
    async getUserById(id){
        return await User.findById(id)
                .populate('favoriteProducts')
                .populate('viewedProducts')
                .populate('orders');
    },
    /**
     * Get user by id
     * 
     * @param  {any} id id users, we must pass this parametr in the type with which you want compare
     * @return {Object} user
     */
    async getLogin(username){
        return await User.findOne({username});
    },
    /**
     * 
     * @param {*} id 
     * @param {*} token 
     */
    async getSignature(id, token){
        return await User.findOne({_id:id, 'tokens.token': token});
    }
}
