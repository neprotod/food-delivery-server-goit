const mongoose = require('mongoose');
const config = require('../../config');

try{
    mongoose.connect(config.connectionUrl, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
    
    console.log('MongoDB is connection');
}catch(e){
    console.error(e);
}