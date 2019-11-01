const Register = require("./handler/register");
const http = require('http');
const url = require('url');

const router = require('./router');

const start = (PORT) => {
    const server = http.createServer((req, res)=>{
        res.end('');
    });

    server.listen(PORT,()=>{
        console.log(`Server is starting in port ${PORT}`);
    });
}

module.exports = {start};


