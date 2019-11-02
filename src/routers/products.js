const fs = require('fs');
const path = require('path');

module.exports = (req,res) =>{

    res.writeHead(200, {"Content-Type": "application/json"});

    const filePath = path.join(__dirname,'..','db','all-products.json');
    let data = fs.readFileSync(filePath, 'utf8');

    if(!data)
        data = JSON.stringify({});

    return data;
}