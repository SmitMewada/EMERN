const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Deleting an order
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(new ErrorHandler("Order not found!", 404));
  await order.remove();
  res
    .status(200)
    .json({ success: true, message: "Order deleted sucessfully!" });
});

// Updating order status
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const { orderID, status } = req.body;
  const order = await Order.findById(orderID);

  if (!order) return next(new ErrorHandler("Order not found!", 404));

  if (order.orderStatus === "Delivered")
    return next(
      new ErrorHandler("You have already delivered this order!", 400)
    );

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  order.orderStatus = status;

  if (status === "Delivered") order.deliveredAt = Date.now();

  await order.save({ validateBeforeSave: false });
  return res.status(200).json({
    success: "Order updated sucessfully!",
    order,
  });
});

// Get all orders
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({}).populate("user", "name email");

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({ success: true, totalAmount, orders });
});

// Get logged in user order
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id }).populate(
    "user",
    "name email"
  );

  res.status(200).json({ success: true, orders });
});

// Get single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  return !order
    ? next(new ErrorHandler("Order not found!", 404))
    : res.status(200).json({ success: true, order });
});

// Creating new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    city,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user.id,
    city,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// Custom functions for order route

async function updateStock(id, qty) {
  const product = await Product.findById(id);

  product.stock = product.stock - qty;
  console.log(product.stock);
  await product.save({ validateBeforeSave: false });
}
