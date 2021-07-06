'use strict';
const config = require('./config');
const app=require('./app');

app.listen(config.port,(err,res)=>{
    if(err){
        console.log('Error: ',err);
    }else{
        console.log('Server running in port: ',config.port);
    }
});