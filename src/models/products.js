  
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const {findProducts, findCategories} = require('../utils/products');

const readFile = promisify(fs.readFile);

module.exports = {
    /**
     * Keep cache all products
     * @type {Array}
     */
    allProducts: [],
    /**
     * Get All Products
     * 
     * @return {Array} allProducts
     */
    async getAllProducts(){
        if(this.allProducts.length !== 0)
            return this.allProducts;
        
        const filePath = path.join(__dirname,'..','db','all-products.json');
        try{ 
            const allProducts  = await readFile(filePath, 'utf8');

            this.allProducts = [];
            if(!allProducts ){
                return this.allProducts;
            }else{
                return this.allProducts = JSON.parse(allProducts);
            }
        }catch(e){
            console.error(e);
        }
    },
    /**
     * Find products by ids
     * 
     * @param  {Array} ids ids products
     * @return {Array}     products
     */
    async getProductsByIds(ids){
        const allProducts = await this.getAllProducts();
        return findProducts(allProducts, ids);
    },
    /**
     * Find products by category
     * 
     * @param  {Array} ids ids products
     * @return {Array}     products
     */
    async getProductsByCategory(category){
        const allProducts = await this.getAllProducts();
        return findCategories(allProducts, category);
    }
}