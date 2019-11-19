const products = require('../models/products');

const {findProducts, findCategories} = require('../utils/products');

const productsList = {
    "status": "no products", 
    "products": []
}

module.exports = {
    async getProducts(req, res){
        const allProducts = await products.getAllProducts();
    
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
        
        res.end(JSON.stringify(productsList));
    },
    async getProduct(req, res){
        const allProducts = await products.getAllProducts();
        productsList.products = findProducts(allProducts, [req.params.id]);
        
        if(productsList.products.length > 0){
            productsList.status = "success";
        }
        res.status('200');
        res.set('Content-Type', 'application/json');

        res.end(JSON.stringify(productsList));
    }
}