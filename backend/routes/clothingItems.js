const express = require("express");
const clothingItems = require("../controllers/clothingItems");
const router = express.Router();

// FIX: Changed from getItems to getClothingItems to match your controller naming convention
router.get("/", clothingItems.getClothingItems);

// Base item routes
router.post("/", clothingItems.create);
router.delete("/:id", clothingItems.delete);

// Like / Unlike routes
router.put("/:id/likes", clothingItems.likeItem);
router.delete("/:id/likes", clothingItems.unlikeItem);

module.exports = router;
