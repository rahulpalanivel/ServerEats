const express = require("express");
const {
  addProducts,
  getFoodById,
  getFoodItems,
} = require("../controllers/foodController.js");

const verifyToken = require("../middleware/verifyUser.js");
const verifyRole = require("../middleware/verifyRole.js");

const router = express.Router();

router.post("/add", verifyToken, verifyRole("chef", "admin"), addProducts);
router.get("/", getFoodItems);
router.get("/:id", getFoodById);

module.exports = router;
