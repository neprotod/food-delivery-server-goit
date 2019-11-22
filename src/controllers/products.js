const productsModel = require('../models/products');

const {findProducts, findCategories} = require('../utils/products');

const productsList = {
    "status": "no products", 
    "products": []
}

module.exports = {
    /**
     * Get products by ids or category
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async getProducts(req, res){
        // Delegation request
        if(req.query.ids){
            const ids = req.query.ids.split(',');
            productsList.products = await productsModel.getProductsByIds(ids);
        }else if(req.query.category){
            productsList.products = await productsModel.getProductsByCategory(req.query.category);
        }else{
            productsList.products = await productsModel.getAllProducts();
        }
    
        if(productsList.products.length > 0){
            productsList.status = "success";
        }
    
        res.status('200');
        res.set('Content-Type', 'application/json');

        res.json(productsList);
    },
    /**
     * Get products by id
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async getProduct(req, res){
        productsList.products = await productsModel.getProductsByIds([req.params.id]);

        if(productsList.products.length > 0){
            productsList.status = "success";
        }
        res.status('200');
        res.set('Content-Type', 'application/json');

        res.json(productsList);
    }
}