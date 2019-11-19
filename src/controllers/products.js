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
        const allProducts = await productsModel.getAllProducts();
    
        if(req.query.ids){
            const ids = req.query.ids.split(',');
            productsList.products = findProducts(allProducts, ids);
        }else if(req.query.category){
            productsList.products = findCategories(allProducts, req.query.category);
        }else{
            productsList.products = allProducts;
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
        const allProducts = await productsModel.getAllProducts();
        productsList.products = findProducts(allProducts, [req.params.id]);
        
        if(productsList.products.length > 0){
            productsList.status = "success";
        }
        res.status('200');
        res.set('Content-Type', 'application/json');

        res.json(productsList);
    }
}