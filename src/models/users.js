const mongoose = require('mongoose');
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
    }
});

userShema.index({email: 1}, {unique: true});

const User = mongoose.model('users', userShema);

module.exports = {
    /**
     * Update user
     * 
     * @param  {number} id   user id
     * @param  {Object} user user fields to update
     * @return {Object}      user
     */
    async updateUser(id, userParams){
        return await User.findByIdAndUpdate(id, userParams, {new: true});
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
    }
}
