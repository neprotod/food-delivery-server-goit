const fs = require('fs');
const path = require('path');

module.exports = async (req,res) =>{

    res.writeHead(200, {"Content-Type": "application/json"});

    const filePath = path.join(__dirname,'..','db','all-products.json');
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data)=>{
            if(err)
                reject(err);
            if(!data)
                data = JSON.stringify({});
            
            resolve(data);
        });
    });
}