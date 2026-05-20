// middleware/logger.js
const winston = require('winston');

// Define a reusable JSON format for production tracing
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);

// 1. Logger dedicated to recording incoming HTTP requests
const requestLogger = winston.createLogger({
  format: logFormat,
  transports: [
    new winston.transports.File({ filename: 'logs/request.log' }),
  ],
});

// 2. Logger dedicated to tracking application failures
const errorLogger = winston.createLogger({
  format: logFormat,
  transports: [
    new winston.transports.File({ filename: 'logs/error.log' }),
  ],
});

// Custom Express middleware wrappers
const requestLogMiddleware = (req, res, next) => {
  requestLogger.info({
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    timestamp: new Date().toISOString(),
  });
  next();
};

const errorLogMiddleware = (err, req, res, next) => {
  errorLogger.error({
    message: err.message,
    statusCode: err.statusCode || 500,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
  next(err); // Pass the error along to your centralized errorHandler
};

module = {
  requestLogMiddleware,
  errorLogMiddleware,
};
