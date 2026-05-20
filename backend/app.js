const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler"); // Fixed path and added extension

// Import your request validation functions
const {
  validateUserBody,
  validateUserIdParam,
} = require("./middlewares/validation"); // Fixed path and added extension

// Import your Winston logging middlewares
const {
  requestLogMiddleware,
  errorLogMiddleware,
} = require("./middlewares/logger"); // Fixed path and added extension

const app = express();

// 1. Security and Terminal Logging Middlewares (Must be at the top)
app.use(helmet());
app.use(cors());
app.use(morgan("dev")); // Console logging for development debugging

// 2. Winston File Request Logger (Must run before any routes or body parsers)
app.use(requestLogMiddleware);

// 3. Request Body Parsing Middlewares (Must be before routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Your Application Routes
app.get("/api/example", (req, res) => {
  res.status(200).json({ status: "success", message: "Hello World" });
});

// Route for creating a user with Joi/Celebrate body validation
app.post("/api/users", validateUserBody, (req, res) => {
  res.status(201).json({ status: "success", data: req.body });
});

// Route for getting a single user with ID parameter validation
app.get("/api/users/:id", validateUserIdParam, (req, res) => {
  res.status(200).json({ status: "success", id: req.params.id });
});

// Example route that triggers your custom error handler manually
app.get("/api/error-test", (req, res, next) => {
  const err = new Error("This is a test operational error");
  err.statusCode = 400;
  next(err);
});

// 5. Winston Error Logger (Must sit below routes to catch errors, but above errorHandler)
app.use(errorLogMiddleware);

// 6. Centralized Error Handling Middleware (Must be at the absolute bottom)
app.use(errorHandler);

module.exports = app;
