const express = require("express");
const {
  addProducts,
  getFoodById,
  getFoodItems,
} = require("../controllers/Food.js");

const router = express.Router();

router.post("/add", addProducts);
router.get("/", getFoodItems);
router.get("/:id", getFoodById);

module.exports = router;
