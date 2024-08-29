const express = require("express");
const {
  placeOrder,
  getAllOrders,
} = require("../controllers/ordersController.js");

const verifyToken = require("../middleware/verifyUser.js");

const router = express.Router();

router.post("/", verifyToken, placeOrder);
router.get("/", verifyToken, getAllOrders);

module.exports = router;
