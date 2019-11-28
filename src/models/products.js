  
const mongoose = require('mongoose');
const ProductType = require('./productTypes');

const Schema = mongoose.Schema;
const productShema = new Schema({
    sku: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    categories: [{
        type: mongoose.Types.ObjectId,
        ref: 'product_types'
    }]
  },
  {timestamps: true});

const Product = mongoose.model('Products',productShema);

module.exports = {
    /**
     * Save products
     * 
     * @param  {{}} date fields to DB
     * @return {{}} user in DB
     */
    async saveProducts(date){
        const product = new Product(date);
        return await product.save();
    },

    /**
     * Get All Products
     * 
     * @return {Array} allProducts
     */
    async getAllProducts(){
        return await Product.find({}).populate('categories');
    },
    /**
     * Find products by ids
     * 
     * @param  {Array} ids ids products
     * @return {Array}     products
     */
    async getProductsByIds(ids){
        return await Product.find({'_id':{$in:ids}}).populate('categories');
    },
    /**
     * Find products by category
     * 
     * @param  {Array} ids ids products
     * @return {Array}     products
     */
    async getProductsByCategory(category){
        const findCategory = await ProductType.getCategoryByName(category);

        // If we don't have any category
        if(findCategory.length < 1){
            const error = new Error(`Category ${category} doesn't exist`);
            error.code = 1;
            throw error;
        }
        
        return await Product.find({'categories': {$in: [findCategory[0]._id]}}).populate('categories');
    }
}