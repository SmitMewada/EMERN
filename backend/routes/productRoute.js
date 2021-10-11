const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizedRoles } = require("../middlewares/auth");
const router = express.Router();

router.route("/product/reviews").get(isAuthenticatedUser, getProductReviews);
router.route("/product/review").put(isAuthenticatedUser, createProductReview);
router.route("/product/review/:id").delete(isAuthenticatedUser, deleteReview);

router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getProductDetails);

router
  .route("/admin/product")
  .post(isAuthenticatedUser, authorizedRoles("ADMIN"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizedRoles("ADMIN"), updateProduct);
router
  .route("/admin/product/:id")
  .delete(isAuthenticatedUser, authorizedRoles("ADMIN"), deleteProduct);

// Note: Here we can chain up all the methods if the uer is same as in case of 3rd, 4th, 5th routes

module.exports = router;
