// middleware/auth.js
const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors/UnauthorizedError"); // Load custom error class
const { JWT_SECRET } = require("../utils/config");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // 1. Verify token presence and structure
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Authorization required"));
  }

  const token = authorization.replace("Bearer ", "");

  try {
    // 2. Verify token validity
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    // 3. Delegate to central pipeline so Winston logs it and errorHandler catches it
    return next(new UnauthorizedError("Authorization required"));
  }
};
