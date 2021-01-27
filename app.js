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
    const returnError = {
        message: error.message,
        status: error.status,
        data: error.data
    }
    res.status(error.statusCode).json(returnError);
});

module.exports = app;