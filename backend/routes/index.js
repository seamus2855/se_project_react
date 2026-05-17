const router = require("express").Router();
const auth = require("../middlewares/auth");
const usersRouter = require("./users");
const clothingItemsRouter = require("./clothingItems"); // FIX: Corrected import name to match clothingItems.js file name

// Controllers for public handlers
const { login, createUser } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItems"); // FIX: Matches your main item fetching method name

// ==========================================
// 1. PUBLIC ENDPOINTS (No token required)
// ==========================================
router.post("/signin", login);
router.post("/signup", createUser);

// FIX: Mount the public GET /items route BEFORE auth middleware 
// This resolves the 401 Unauthorized crash on application page load
router.get("/items", getItems);

// ==========================================
// 2. PROTECTED ENDPOINTS (Requires valid token)
// ==========================================
router.use("/users", auth, usersRouter);
router.use("/items", auth, clothingItemsRouter); // Handles protected operations like POST/DELETE/LIKE

module.exports = router;
