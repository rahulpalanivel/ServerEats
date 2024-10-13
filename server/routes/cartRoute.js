const express = require("express");
const {
  addToCart,
  getAllCartItems,
  removeAllFromCart,
  removeFromCart,
} = require("../controllers/cartController.js");

const verifyToken = require("../middleware/verifyUser.js");
const verifyRole = require("../middleware/verifyRole.js");

const router = express.Router();

router.post("/", verifyToken, verifyRole("customer"), addToCart);
router.get("/", verifyToken, verifyRole("customer"), getAllCartItems);
router.delete("/", verifyToken, verifyRole("customer"), removeAllFromCart);
router.patch("/", verifyToken, verifyRole("customer"), removeFromCart);

module.exports = router;
