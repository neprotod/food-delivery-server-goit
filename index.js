const express = require('express');
const config = require('./config');

// Connection to database
require('./src/db/mongoose');

const routers = require('./src/routers');

const app = express();


process.on('exit',()=>{
    console.error('Shutdown node js');
});


app.use(express.json());
app.use('/', routers);



app.listen(config.port, ()=>{
    console.log(`Server is starting in ${config.port}`);
});