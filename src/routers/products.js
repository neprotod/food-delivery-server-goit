const fs = require('fs');
const path = require('path');

/**
 * This function will find all products by ids
 * 
 * @param  {Object} products all proucts
 * @param  {Array}  ids      id to find
 * @param  {string} category id to find
 * @return {Array} return products or []
 */
function findProducts(products, ids, category = null){
    let productsList = [];

    for(let product of products){

        let check = false;

        if(Array.isArray(ids)){
            check = ids.some((id)=>{
                return +id === product.id;
            });
        }else if(category){
            check = product.categories.some((cat)=>{
                return cat === category;
            });
        }
        
        if(check){
            productsList.push(product);
        }
    }

    return productsList;
}

module.exports = async (req, res, id = null) =>{

    const productsList = {
        "status": "no products", 
        "products": []
    }


    res.writeHead(200, {"Content-Type": "application/json"});

    const filePath = path.join(__dirname,'..','db','all-products.json');
    try{
        const allProducts = await new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, allProducts)=>{
                if(err)
                    return reject(err);
                try{
                    // To get string because empty file is buffer
                    allProducts = allProducts.toString();

                    if(!allProducts)
                        allProducts = [];
                
                    return resolve(JSON.parse(allProducts));
                }catch(e){
                    return reject(e);
                }
            });
        }).catch((err) => console.error(err));
        
        // if we got an id or category, we should find it
        if(id){
            productsList.products = findProducts(allProducts, [id]);
        }else if(req.query.ids){
            productsList.products = findProducts(allProducts, req.query.ids.split(','));
        }else if(req.query.category){
            productsList.products = findProducts(allProducts, null, req.query.category);
        }else{
            // return all products
            return JSON.stringify(allProducts);
        }

        // Check and return find products
        if(productsList.products.length > 0)
            productsList.status = "success";

        return JSON.stringify(productsList);

        
    }catch(e){
        console.error(e);

        return JSON.stringify(productsList);
    }
}