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
    let find = [];
    for(let product of products){
        let check = false;
        if(ids){
            check = ids.some((id)=>{
                return id == product.id;
            });
        }else if(category){
            
            check = product.categories.some((cat)=>{
                return cat == category;
            });
        }
        
        if(check){
            find.push(product);
        }
    }

    return find;
}

module.exports = async (req,res, id = null) =>{

    const find_products = {
        "status": "no products", 
        "products": []
    }


    res.writeHead(200, {"Content-Type": "application/json"});

    const filePath = path.join(__dirname,'..','db','all-products.json');
    try{
        const products = await new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data)=>{
                if(err)
                    return reject(err);
                try{
                    // To get string because empty file is buffer
                    data = data.toString();

                    if(!data)
                        data = [];
                
                    return resolve(JSON.parse(data));
                }catch(e){
                    return reject(e);
                }
            });
        }).catch((err) => console.error(err));
        
        // if we got an id or category, we should find it
        if(id){
            find_products.products = findProducts(products, [id]);
        }else if(req.query.ids){
            find_products.products = findProducts(products, req.query.ids.split(','));
        }else if(req.query.category){
            find_products.products = findProducts(products, null, req.query.category);
        }else{
            // return all products
            return JSON.stringify(products);
        }

        // Check and return find products
        if(find_products.products.length > 0)
            find_products.status = "success";

        return JSON.stringify(find_products);

        
    }catch(e){
        console.error(e);

        return JSON.stringify(find_products);
    }


}