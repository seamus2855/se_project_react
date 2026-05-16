const express = require("express");
const clothingItems = require("../controllers/clothingItems");

// FIX: Added mergeParams so child routes can read the ":id" from routes/index.js
const router = express.Router({ mergeParams: true });

// Base item routes (Protected by auth middleware via routes/index.js)
router.post("/", clothingItems.create);
router.delete("/:id", clothingItems.delete);

// Like / Unlike routes
router.put("/:id/likes", clothingItems.likeItem);
router.delete("/:id/likes", clothingItems.unlikeItem);

module.exports = router;
