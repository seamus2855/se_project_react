const router = require("express").Router();
const auth = require("../middlewares/auth");
const userRouter = require("./users");
const itemsRouter = require("./clothingItems"); // Ensure path is correct
const { login, createUser } = require("../controllers/users");
const { getAll } = require("../controllers/clothingItems");

// Public routes
router.post("/signin", login);
router.post("/signup", createUser);
router.get("/items", getAll); // This handles the initial public fetch

// Protected routes
router.use("/users", auth, userRouter);
router.use("/items", auth, itemsRouter); // This handles POST/DELETE/LIKE

module.exports = router;
