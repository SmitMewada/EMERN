const sendToken = (user, statusCode, res) => {
  // Creating token and saving as cookie
  const token = user.getJWTToken();

  // options for cookie
  const options = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE_TIME* 24 * 60 * 60 * 1000
    ),
  };

  res.status(statusCode).cookie("token", token, options).json({
    sucess: true,
    token,
    user,
  });
};

module.exports = sendToken;
