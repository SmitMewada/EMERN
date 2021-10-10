const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies; // Here cookies will return a object for request object

  if (!token)
    return next(new ErrorHandler("Please login to access this resource!", 401));

  const decodeddata = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodeddata.id);

  next();
});

exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    return !roles.includes(req.user.role)
      ? next(
          new ErrorHandler(
            `Role: ${req.user.role} id not authorized for this resource!`,
            401
          )
        )
      : next();
  };
};
