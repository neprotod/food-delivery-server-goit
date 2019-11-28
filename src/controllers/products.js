const Product = require('../models/products');

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
        try{
            if(req.query.ids){
                const ids = req.query.ids.split(',');
                productsList.products = await Product.getProductsByIds(ids);
            }else if(req.query.category){
                productsList.products = await Product.getProductsByCategory(req.query.category);
            }else{
                productsList.products = await Product.getAllProducts();
            }
        }catch(e){
            console.error(e);
            // Category dasen't exist
            if(e.code === 1){
                return res.status('400').json({errors:[e.toString()]});
            }
            return res.status('500').json({errors:['Database error']});
        }
    
        if(productsList.products.length > 0){
            productsList.status = "success";
        }

        res.status('200').json(productsList);
    },
    /**
     * Get products by id
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async getProduct(req, res){
        try{
            productsList.products = await Product.getProductsByIds([req.params.id]);

            if(productsList.products){
                productsList.status = "success";
            }
            res.status('200').json(productsList);
        }catch(e){
            console.error(e);
            res.status('500').json({errors:['Database error']});
        }
    },
    /**
     * Save product
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async saveProducts(req, res){
        try{
            const product = await Product.saveProducts(req.body);
            const result = {
                status: "success",
                product: product
            }
            res.status(201).json(result);
        }catch(e){
            console.log(e);

            //duplicate key
            if ( e.code === 11000 ) {
                return res.status(400).json({errors:['This user already exist']});
            }

            res.status(500).json({errors:['Database error']});
        }
    }
}