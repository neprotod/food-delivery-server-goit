  
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const readFile = promisify(fs.readFile);

module.exports = {
    /**
     * Get All Products
     * 
     * @return {Array} allProducts
     */
    async getAllProducts(){
        const filePath = path.join(__dirname,'..','db','all-products.json');
        try{ 
            const allProducts  = await readFile(filePath, 'utf8');
            
            if(!allProducts ){
                return [];
            }else{
                return JSON.parse(allProducts);
            }
        }catch(e){
            console.error(e);
        }
    }
}