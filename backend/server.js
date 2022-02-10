// Handling uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("shutting down server due to uncaughtException.");
});

const app = require("./app");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");


// Configuration  
dotenv.config({path: "backend/config/config.env"});

// Variables
const port = process.env.PORT || 4000;

// Connecting to database
connectDatabase();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const server = app.listen(port, () => {
    console.log(`server has started on https://localhost:${port}`)
})

// Unhandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log("shutting down server due to unhandled promise rejection.");

    server.close(() => {
        process.exit(1);
    })
    
})