const express = require("express");
const {
  addToCart,
  getAllCartItems,
  removeFromCart,
} = require("../controllers/cartController.js");

const verifyToken = require("../middleware/verifyUser.js");

const router = express.Router();

router.post("/", verifyToken, addToCart);
router.get("/", verifyToken, getAllCartItems);
router.patch("/", verifyToken, removeFromCart);

module.exports = router;
