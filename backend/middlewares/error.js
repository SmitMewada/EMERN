const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res , next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    // MongoDB castID error
    if (err.name == "CastError") {
       
        const message = `Resource not found or Invalid ID. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Mongoose duplicate key error
    if (err.code == 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered!`;
        err = new ErrorHandler(message, 400)
    }

    // Wrong JWT error
    if (err.name == "JsonWebTokenError") {
        const message = `Json Web Token is invalid! Try again`;
        err = new ErrorHandler(message, 400)
    }
    // Wrong JWT error
    if (err.name == "TokenExpiredError") {
        const message = `Json Web Token is expired! Try again`;
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        stack: err.stack    
    })
}

// Notes: Here we can write err.stack to trace stack