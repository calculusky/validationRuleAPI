const express = require('express');
const app = express();

//import route
const ruleValidationRoute = require('./routes/ruleValidation');

//register middlewares
app.use(express.json());

//send data 
app.use(ruleValidationRoute);

//send error
app.use((error, req, res, next) => {
    if(error instanceof SyntaxError && error.status === 400){
        return res.status(400).json({
            message: 'Invalid JSON payload passed',
            status: 'error',
            data: null
        })
    }
    const returnError = {
        message: error.message,
        status: error.status,
        data: error.data
    }
    res.status(error.statusCode).json(returnError);
});

module.exports = app;