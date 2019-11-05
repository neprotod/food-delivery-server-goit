const path = require('path');
const fs = require('fs');

const connection = async (req,res,routName,params)=>{
    try{
        const router = require('./routers/'+routName);

        try{
            return await router(req,res,...params);
        }catch(e){
            console.error(e);
        }
    }catch(e){
        console.error(e);
        res.writeHead(404, {"Content-Type": "text/html"});
        return `There isn't router "${routName}" in application`;
    }
}

module.exports = {connection}