  
const mongoose = require('mongoose');

const ProductType = mongoose.model('product_types',{
    type: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = {
    /**
     * Find category type by category name
     * 
     * @param  {String} type category type (name)
     * @return {{}} id and category type
     */
    async getCategoryByName(type){
        return await ProductType.find({type});
    }
};