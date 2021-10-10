const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");

// Route imports
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoutes");

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use(errorMiddleware);

module.exports = app;
