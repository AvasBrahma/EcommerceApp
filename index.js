const express=require('express');
const db=require('./config/mongoose');
const authJWT = require('./config/jwt_auth');
const errorHandler=require('./config/error-handler');
const bodyParser = require('body-parser');
const morgan =require('morgan');
const app=express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJWT);
app.use(errorHandler);


app.use('/', require('./routes'));

// Start the server
const port=8000;
app.listen(port, function(err){

    if(err){
        console.log(`Error running in server : ${err}`);
    }
    console.log(`Server is running in port : ${port}`);
});