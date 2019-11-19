module.exports = {
    /**
     * This function will find all products by ids
     * 
     * @param  {Object} products all proucts
     * @param  {Array}  ids      id to find
     * @return {Array} return products or []
     */
    findProducts(products, ids){
        let productsList = [];

        for(let product of products){

            let check = false;

            if(Array.isArray(ids)){
                check = ids.some((id)=>{
                    return +id === product.id;
                });
            }
            
            if(check){
                productsList.push(product);
            }
        }

        return productsList;
    },
    /**
     * This function will find all products by categories
     * 
     * @param  {Object} products all proucts
     * @param  {string} category id to find
     * @return {Array} return products or []
     */
    findCategories(products, category){
        let productsList = [];

        for(let product of products){

            let check = false;

            if(category){
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
}