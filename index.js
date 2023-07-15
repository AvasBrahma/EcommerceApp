const express=require('express');
const db=require('./config/mongoose');

const app=express();



app.use('/', require('./routes'););

// Start the server
const port=8000;
app.listen(port, function(err){

    if(err){
        console.log(`Error running in server : ${err}`);
    }
    console.log(`Server is running in port : ${port}`);
});