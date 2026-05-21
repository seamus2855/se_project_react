// middleware/validation.js
const { celebrate, Joi, Segments } = require("celebrate");
const validator = require("validator");

// Custom validator function using the 'validator' package
const validateURL = (value, helpers) => {
  if (!validator.isURL(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

// Validation for creating/updating a user
const validateUserBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "Name must be at least 2 characters long",
      "any.required": "Name is required",
    }),
    email: Joi.string().required().email().messages({
      "string.email": "Must be a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string().required().min(8),
    avatar: Joi.string().custom(validateURL).messages({
      "any.invalid": "Avatar must be a valid URL",
    }),
  }),
});

// Validation for URL parameters (like checking a MongoDB ID)
const validateUserIdParam = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().hex().length(24).required().messages({
      "string.length": "Invalid user ID format",
    }),
  }),
});

module.exports = {
  validateUserBody,
  validateUserIdParam,
};
