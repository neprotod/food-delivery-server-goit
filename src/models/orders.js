const fs = require('fs');
const path = require('path');
const util = require('util');
const usersModel = require('./users');
const productsModel = require('./products');

const stat = util.promisify(fs.stat);
const writeFile = util.promisify(fs.writeFile);
const readFile  = util.promisify(fs.readFile);

/**
 * 
 */
module.exports = {
    /**
     * Path file for all users
     * @type {string}
     */
    path: path.join(__dirname, '../db/all-orders.json'),

    /**
     * Get all orders from file
     * 
     * @return {Array} all users
     */
    async getAllOrders(){
        try{
            await stat(this.path);
        }catch(e){
            // We don't have file, return empty array
            return [];
        }
        const allOrders = await readFile(this.path, 'utf8');

        // If empty file
        if(!allOrders)
            return [];

        return JSON.parse(allOrders);
    },

    /**
     * Save orders
     * 
     * @param  {Object} order order to save
     * @return {Object}      order
     */
    async saveOrder(order){
        const allOrders = await this.getAllOrders();
        allOrders.push(order);
        try{
            await writeFile(this.path, JSON.stringify(allOrders, null, '  '));
        }catch(e){
            console.error(e);
        }

        return order;
    },

    /**
     * 
     * @param  {any} id id orders, we must pass this parametr in the type with which you want compare
     * @return {Object| null} order
     */
    async getOrderById(id){
        const allOrders = await this.getAllOrders();
        
        const order =  allOrders.find((elem)=>{
            if(elem.id === id){
                return elem;
            }
        });

        if(!order){
            return false;
        }

        // We supplement data
        order.user = await usersModel.getUserById(order.user);
        delete order.user.id;

        order.products = await productsModel.getProductsByIds(order.products);

        return order;

    }
}
