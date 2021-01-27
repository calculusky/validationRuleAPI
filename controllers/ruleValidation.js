const { validationFunc, throwError } = require("../utils/helper");


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
        validationFunc(req.body, throwError);

        //return success message
        res.json({ message: 'success'})

    } catch (error) {
        next(error)
    }
      
}