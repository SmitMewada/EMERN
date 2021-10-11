const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErros = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Delete a review
exports.deleteReview = catchAsyncErros(async (req, res, next) => {
  const { productID } = req.body;
  const product = await Product.findById(productID);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => (avg += rev.rating));
  const ratings = avg / reviews.length;
  const numOfreviews = reviews.length;

  await Product.findByIdAndUpdate(
    productID,
    {
      reviews,
      ratings,
      numOfreviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: `Review deleted successfully for the ${product.name}`
  })
});

// Get all reviews of single product
exports.getProductReviews = catchAsyncErros(async (req, res, next) => {
  const { productID } = req.body;
  const product = await Product.findById(productID);

  return !product
    ? next(new ErrorHandler("Product not found", 404))
    : res.status(200).json({ success: true, reviews: product.reviews });
});

// Create review and update review
exports.createProductReview = catchAsyncErros(async (req, res, next) => {
  const { rating, comment, productID } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productID);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user.id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user._id.toString() === req.user.id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfreviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({
    validateBeforeSave: false,
  });

  res.status(200).json({
    success: true,
  });
});

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
  const apiFeature = new ApiFeatures(Product.find({}), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);

  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
  });
});
