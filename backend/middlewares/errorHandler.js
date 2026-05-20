// errorHandler.js
const { isCelebrateError } = require('celebrate');

const errorHandler = (err, req, res, next) => {
  // 1. Log for developer debugging
  // eslint-disable-next-line no-console
  console.error(err);

  // FIXED: Destructure properties directly with a default value to satisfy prefer-destructuring
  const { statusCode = 500, message } = err;

  let finalStatusCode = statusCode;
  let finalMessage = message;

  // 2. Intercept Celebrate/Joi validation errors
  if (isCelebrateError(err)) {
    finalStatusCode = 400;
    // Extract the exact validation error message from Body, Params, or Query
    const errorBody = err.details.get('body') || err.details.get('params') || err.details.get('query');
    finalMessage = errorBody.details.map((detail) => detail.message).join(', ');
  }

  // 3. Send response
  res.status(finalStatusCode).send({
    message: finalStatusCode === 500 ? "An error occurred on the server" : finalMessage,
  });

  // eslint-disable-next-line no-unused-vars
  const ignoreNext = next;
};

module.exports = errorHandler;
