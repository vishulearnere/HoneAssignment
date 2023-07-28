//customAPIError is a sub class of error class i.e. error is it's parents class
// whenever an instance of a class is made constructor get automatically called or invoked
class CustomAPIError extends Error {
    constructor(message, statusCode) { // Here we definded constructor of  our customAPI Error 
        super(message) // here we called our parent class by sending message as parameter 
        //so now we have access of all functions  and properties of parent class
        this.statusCode = statusCode // here parent class 
    }

}

// Now in order to acces customAPIError class we need to make instance of it i.e new CustomAPIError(msg, statusCode) 
//  here we are creating a func which will return a new instance of customAPIError class whenver this function is called
const createCustomError = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode)
}

module.exports = {
    createCustomError,
    CustomAPIError
}