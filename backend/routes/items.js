const express = require("express");
const clothingItems = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");

const router = express.Router();

// All item routes require authentication
router.use(auth);

// GET all items
router.get("/", clothingItems.getAll);

// Create a new item
router.post("/", clothingItems.create);

// Delete an item (with ownership check inside controller)
router.delete("/:id", clothingItems.delete);

// Like / Unlike routes
router.put("/:id/likes", clothingItems.likeItem);
router.delete("/:id/likes", clothingItems.unlikeItem);

module.exports = router;

