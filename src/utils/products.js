module.exports = {
    /**
     * This function will find all products by ids
     * 
     * @param  {Object} products all proucts
     * @param  {Array}  ids      id to find
     * @return {Array} return products or []
     */
    findProducts(products, ids){
        return products.filter((elem)=>{
            if(ids.includes(`${elem.id}`)){
                return true;
            }
            return false;
        });
    },
    /**
     * This function will find all products by categories
     * 
     * @param  {Object} products all proucts
     * @param  {string} category id to find
     * @return {Array} return products or []
     */
    findCategories(products, category){
        return products.filter((elem)=>{
            if(elem.categories.includes(category)){
                return true;
            }
            return false;
        });
    }
}