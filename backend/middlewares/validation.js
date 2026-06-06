const { celebrate, Joi, Segments } = require("celebrate");
const validator = require("validator");

// Custom URL validator logic
const validateURL = (value, helpers) => {
  return validator.isURL(value, { require_protocol: true }) 
    ? value 
    : helpers.error("any.invalid");
};

// User body schema
const validateUserBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "Name must be at least 2 characters long",
      "string.max": "Name cannot exceed 30 characters",
      "any.required": "Name is required",
    }),
    email: Joi.string().required().email().messages({
      "string.email": "Must be a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string().required().min(8).messages({
      "string.min": "Password must be at least 8 characters long",
      "any.required": "Password is required",
    }),
    avatar: Joi.string().custom(validateURL).messages({
      "any.invalid": "Avatar must be a valid URL",
    }),
  }),
});

// URL parameter schema for MongoDB IDs
const validateUserIdParam = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().hex().length(24).required().messages({
      "string.length": "Invalid user ID format",
      "string.hex": "Invalid user ID format",
      "any.required": "User ID is required",
    }),
  }),
});

module.exports = {
  validateUserBody,
  validateUserIdParam,
};
