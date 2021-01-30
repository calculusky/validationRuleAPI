const { throwError } = require("../utils/helper");
const { validator } = require('./validator');


exports.myInfo = (req, res, next) => {
    const info = {
        message: 'My Rule-Validation API',
        status: 'success',
        data: {
            name: 'Nwankwo Chinedum Valentine',
            github: '@calculusky',
            email: 'calculusky@gmail.com',
            mobile: '07030829057',
            twitter: '@Nwankwo71261692'
        }
    }
    res.json(info)
}

exports.validateRule = async (req, res, next) => {  
    try {
        const { error, statusCode, result } = validator(req);
        //validator(req);

        if(error && statusCode){
            return res.status(statusCode).json(result)
        }
        if(error){
            throwError(result)
        }
        res.json(result);

    } catch (error) {
        next(error)
    }
      
}