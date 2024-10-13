const express = require("express");
const {
  placeOrder,
  getOrdersByCustomer,
} = require("../controllers/ordersController.js");

const verifyToken = require("../middleware/verifyUser.js");
const verifyRole = require("../middleware/verifyRole.js");

const router = express.Router();

router.post("/", verifyToken, verifyRole("customer"), placeOrder);
router.get(
  "/",
  verifyToken,
  verifyRole("customer", "chef", "admin"),
  getOrdersByCustomer
);

module.exports = router;
