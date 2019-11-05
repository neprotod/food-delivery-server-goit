const Register = require("./handler/register");
const http = require('http');
const url = require('url');
const qs = require('querystring');

const router = require('./router');

const start = (PORT) => {
    const server = http.createServer((req, res)=>{
        let parseUrl;

        try{
            parseUrl = url.parse(req.url, true);
        }catch(e){
            console.error('Parse url: ',e);
            res.end();
            return false;
        }
        

        let routName = 'default';
        let params = [];


        let parse = String(parseUrl.pathname).split('/');

        parse.shift();

        // Get rout name and get params
        if(parse[0] != ''){
            routName = parse.shift();
            params = parse;
        }

        

        let body = '';
        // We have to get data from buffer
        req.on('data',(data)=>{
            body += data;
        });

        req.on('end',async ()=>{
            req.body = '';
            if(body)
                req.body = qs.parse(body);

            const result = await router.connection(req,res,routName,params);
            
            res.end(result);
        });
    });

    server.listen(PORT,()=>{
        console.log(`Server is starting in port ${PORT}`);
    });
}

module.exports = {start};


