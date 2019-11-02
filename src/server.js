const Register = require("./handler/register");
const http = require('http');
const url = require('url');

const router = require('./router');

const start = (PORT) => {
    const server = http.createServer((req, res)=>{
        const parseUrl = url.parse(req.url, true);

        let routName = 'default';
        let params = [];


        let parse = String(parseUrl.pathname).split('/');

        parse.shift();

        // Get rout name and get params
        if(parse[0] != ''){
            routName = parse.shift();
            params = parse;
        }

        // Register global variable
        Register.url = parseUrl;
        Register.method = req.method;

        const result = router.connection(req,res,routName,params);

        res.end(result);
    });

    server.listen(PORT,()=>{
        console.log(`Server is starting in port ${PORT}`);
    });
}

module.exports = {start};


