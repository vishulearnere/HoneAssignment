// Important 
//this file has two types of  Error one when _id is validated and we don't get any data from provided id this one needs createCustomError
// the second one is try and catch wala error which includes validation and others  
const {
    CustomAPIError
} = require('../errors/custome-error')

const errorHandlerMiddleware = (err, req, res, next) => {

    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({
            msg: err.message
        })
    }
    return res.status(500).json({
        msg: 'something went wrong',
        altmessage: err.message
    })
}
module.exports = errorHandlerMiddleware