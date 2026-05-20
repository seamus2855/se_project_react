// errorHandler.js
const { isCelebrateError } = require('celebrate');

const errorHandler = (err, req, res, next) => {
  // 1. Log for developer debugging
  // eslint-disable-next-line no-console
  console.error(err);

  let statusCode = err.statusCode || 500;
  let message = err.message;

  // 2. Intercept Celebrate/Joi validation errors
  if (isCelebrateError(err)) {
    statusCode = 400;
    // Extract the exact validation error message from Body, Params, or Query
    const errorBody = err.details.get('body') || err.details.get('params') || err.details.get('query');
    message = errorBody.details.map((detail) => detail.message).join(', ');
  }

  // 3. Send response
  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });

  // eslint-disable-next-line no-unused-vars
  const ignoreNext = next;
};

module.exports = errorHandler;
