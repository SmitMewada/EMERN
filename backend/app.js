const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");

// Route imports
const productRoutes = require("./routes/productRoute");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes")

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoutes)

app.use(errorMiddleware);

module.exports = app;
