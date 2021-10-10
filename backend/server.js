// Handling uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("shutting down server due to uncaughtException.");
});

const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const { Server } = require("http");

// Configuration
dotenv.config({path: "backend/config/config.env"});

// Variables
const port = process.env.PORT || 4000;

// Connecting to database
connectDatabase();


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