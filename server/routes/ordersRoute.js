const express = require("express");
const {
  placeOrder,
  getOrdersByCustomer,
} = require("../controllers/ordersController.js");

const verifyToken = require("../middleware/verifyUser.js");

const router = express.Router();

router.post("/", verifyToken, placeOrder);
router.get("/", verifyToken, getOrdersByCustomer);

module.exports = router;
