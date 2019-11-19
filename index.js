const express = require('express');
const config = require('./config');

const routers = require('./src/routers');

const app = express();

app.use('/', routers);


app.listen(config.port, ()=>{
    console.log(`Server is starting in ${config.port}`);
});