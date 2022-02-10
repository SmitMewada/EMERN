const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getUserDetailsAdmin,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizedRoles} = require("../middlewares/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/me").get(isAuthenticatedUser ,getUserDetails);
router.route("/updatePassword").put(isAuthenticatedUser, updatePassword);
router.route("/logout").get(logout);

router.route("/admin/users").get(isAuthenticatedUser, authorizedRoles("ADMIN"), getAllUsers);
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizedRoles("ADMIN"), getUserDetailsAdmin);

module.exports = router;
