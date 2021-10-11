const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErros = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");


// Get single user details for Admin
exports.getUserDetailsAdmin = catchAsyncErros(async (req, res, next) => {
  const user = await User.findById({ _id: req.params.id });

  return !user
    ? next(new ErrorHandler("User not found!", 404))
    : res.status(200).json({ success: true, user });
});

// Deleting user - Admin
exports.deleteUser = catchAsyncErros(async (req, res, next) => {
  // We will remove cloudinary later

  const user = await User.findById({_id: req.params.id});

  if (!user) return next(new ErrorHandler(`User does not exist with given ID`, 404));

  await user.remove();

  res.status(200).json({
    success: true,
    user
  })
})

// Get all users
exports.getAllUsers = catchAsyncErros(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    success: true,
    users,
  });
});

// Update profile
exports.updateProfile = catchAsyncErros(async (req, res, next) => {
  // Always defined this template kind of thing for updating instead of passing entire req.body
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  // We will add cloudinary later

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  // Note: Here the above method will return previous object to get the lastest one set new=true, to make it by default write mongoose.set('returnOriginal', false);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user password
exports.updatePassword = catchAsyncErros(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched)
    return next(new ErrorHandler("Old password do not match!", 400));

  if (req.body.newPassword !== req.body.confirmPassword)
    return next(new ErrorHandler("Passwords do not match! try again", 400));

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

// Get user details
exports.getUserDetails = catchAsyncErros(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Reset Password
exports.resetPassword = catchAsyncErros(async (req, res, next) => {
  // Creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user)
    return next(
      new ErrorHandler("Reset password token is invalid or expired!", 400)
    );

  if (req.body.password !== req.body.confirmPassword)
    return next(new ErrorHandler("Passwords do not match!", 400));

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Forgot password
exports.forgotPassword = catchAsyncErros(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return next(new ErrorHandler("User not found!", 404));

  // Get reset password token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested password change then please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: `E-MERN Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} sucessfully`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(err.message, 500));
  }
});

// Logout user
exports.logout = catchAsyncErros(async (req, res, next) => {
  // Here cookie is a function for response onject unlike request
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out successfully!",
  });
});

// Authenticating user
exports.loginUser = catchAsyncErros(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please enter email and password!", 400));

  const user = await User.findOne({ email }).select("+password"); // Here we are using select method because we have excluded password in the model for select

  if (!user) return next(new ErrorHandler("Invalid credentials!", 401));

  const isPasswordMatched = await user.comparePassword(password); // Here await is important else promise will be pending

  if (!isPasswordMatched)
    return next(new ErrorHandler("Invalid credentials!", 401));

  sendToken(user, 200, res);
});

// Registering a user
exports.registerUser = catchAsyncErros(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      publicID: "This is a sample ID",
      url: "dummy url",
    },
  });

  sendToken(user, 201, res);
});
