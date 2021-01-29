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
   
    //const { rule, data } = req.body;
    try {
        //validate fields and return error message if exists
        validator(req, res, throwError);

    } catch (error) {
        next(error)
    }
      
}