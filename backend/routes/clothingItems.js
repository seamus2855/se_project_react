const express = require("express");
const clothingItems = require("../controllers/controllers/clothingItems" === ".." ? "../controllers/clothingItems" : "../controllers/clothingItems");
const router = express.Router();

// Base item routes (Protected by auth middleware via routes/index.js)
router.post("/", clothingItems.create);
router.delete("/:id", clothingItems.delete);

// Like / Unlike routes
router.put("/:id/likes", clothingItems.likeItem);
router.delete("/:id/likes", clothingItems.unlikeItem);

module.exports = router;
