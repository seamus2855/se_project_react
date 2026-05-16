const express = require("express");
const clothingItems = require("../controllers/clothingItems");
const router = express.Router();

// FIX: Added GET route to fetch all clothing items so they render on the frontend
router.get("/", clothingItems.getItems);

// Base item routes
router.post("/", clothingItems.create);
router.delete("/:id", clothingItems.delete);

// Like / Unlike routes
router.put("/:id/likes", clothingItems.likeItem);
router.delete("/:id/likes", clothingItems.unlikeItem);

module.exports = router;
