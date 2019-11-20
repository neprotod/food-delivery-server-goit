const fs = require('fs');
const path = require('path');
const util = require('util');

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
    path: path.join(__dirname, '../db/all-users.json'),

    /**
     * Get all users from file
     * 
     * @return {Array} all users
     */
    async getAllUsers(){
        try{
            await stat(this.path);
        }catch(e){
            // We don't have file, return empty array
            return [];
        }
        const allUsers = await readFile(this.path, 'utf8');

        // If empty file
        if(!allUsers)
            return [];

        return JSON.parse(allUsers);
    },

    /**
     * Save user
     * 
     * @param  {Object} user user to save
     * @return {Object}      user
     */
    async saveUser(user){
        const allUser = await this.getAllUsers();
        allUser.push(user);
        try{
            await writeFile(this.path, JSON.stringify(allUser, null, '  '));
        }catch(e){
            console.error(e);
            process.exit(1);
        }

        return user;
    },

    /**
     * 
     * @param  {any} id id users, we must pass this parametr in the type with which you want compare
     * @return {Object} user
     */
    async getUserById(id){
        const allUser = await this.getAllUsers();
        
        return allUser.find((elem)=>{
            if(elem.id === id){
                return elem;
            }
        });
    }
}
