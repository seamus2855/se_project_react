const express = require("express");
const clothingItems = require("../controllers/clothingItems");

// FIX: Added mergeParams: true so item IDs pass cleanly from routes/index.js to controllers
const router = express.Router({ mergeParams: true });

// Base item routes
router.post("/", clothingItems.create);
router.delete("/:id", clothingItems.delete);

// Like / Unlike routes
router.put("/:id/likes", clothingItems.likeItem);
router.delete("/:id/likes", clothingItems.unlikeItem);

module.exports = router;
