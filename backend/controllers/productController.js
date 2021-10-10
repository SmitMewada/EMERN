const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErros = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Get product details
exports.getProductDetails = catchAsyncErros(async (req, res, next) => {

  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Product not found!", 404));

  return res.status(200).json({
    success: true,
    product,
  });
});

// Delete product -- Admin
exports.deleteProduct = catchAsyncErros(async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found!",
    });
  }
  return res.status(200).json({
    success: true,
    product,
  });
});

// Update product -- Admin
exports.updateProduct = catchAsyncErros(async (req, res, next) => {
  try {
    let product = Product.findById(req.params.id);

    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product not found!",
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
});

// Create product -- Admin
exports.createProduct = catchAsyncErros(async (req, res, next) => {
  
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  return res.status(201).json({
    success: true,
    product,
  });
});


// Get all products
exports.getAllProducts = catchAsyncErros(async (req, res, next) => {

  const resultsPerPage = 5;
  const productsCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find({}), req.query).search().filter().pagination(resultsPerPage);

  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productsCount
  });
})
