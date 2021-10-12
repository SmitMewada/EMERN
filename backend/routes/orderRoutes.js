const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();
const { isAuthenticatedUser, authorizedRoles } = require("../middlewares/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/me").get(isAuthenticatedUser, myOrders);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizedRoles("ADMIN"), getAllOrders);
router
  .route("/admin/updateOrderStatus")
  .put(isAuthenticatedUser, authorizedRoles("ADMIN"), updateOrderStatus);
router.route("/admin/order/:id").delete(isAuthenticatedUser, deleteOrder);

module.exports = router;
