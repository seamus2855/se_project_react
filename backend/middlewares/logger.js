// middleware/logger.js
const winston = require('winston');

// Reusable JSON format for production tracing
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);

// 1. Logger dedicated ONLY to recording incoming HTTP requests
const requestLogger = winston.createLogger({
  format: logFormat,
  transports: [
    new winston.transports.File({ 
      filename: 'logs/request.log',
      level: 'info' // Explicitly set level to prevent cross-logging
    }),
  ],
});

// 2. Logger dedicated ONLY to tracking application failures
const errorLogger = winston.createLogger({
  format: logFormat,
  transports: [
    new winston.transports.File({ 
      filename: 'logs/error.log',
      level: 'error' // Explicitly set level to isolate errors
    }),
  ],
});

// Custom Express middleware wrappers
const requestLogMiddleware = (req, res, next) => {
  requestLogger.info({
    method: req.method,
    url: req.originalUrl || req.url, // Fallback safe guard
    ip: req.ip || req.connection.remoteAddress, // Handle proxy environments
  });
  next();
};

const errorLogMiddleware = (err, req, res, next) => {
  errorLogger.error({
    message: err.message || 'An unexpected error occurred',
    statusCode: err.statusCode || 500,
    stack: err.stack,
    url: req.originalUrl || req.url,
    method: req.method,
  });
  next(err); // Pass the error along to centralized errorHandler
};

module.exports = {
  requestLogMiddleware,
  errorLogMiddleware,
};
