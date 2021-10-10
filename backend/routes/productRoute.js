const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser, authorizedRoles } = require("../middlewares/auth");
const router = express.Router();


router.route("/products").get(getAllProducts);
router.route("/product").post(isAuthenticatedUser, authorizedRoles("ADMIN"), createProduct);
router.route("/product/:id").put(isAuthenticatedUser, authorizedRoles("ADMIN") , updateProduct);
router.route("/product/:id").delete(isAuthenticatedUser, authorizedRoles("ADMIN") , deleteProduct);
router.route("/product/:id").get(getProductDetails);

// Note: Here we can chain up all the methods if the uer is same as in case of 3rd, 4th, 5th routes

module.exports = router;