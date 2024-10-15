const express = require("express");
const {
  placeOrder,
  getOrdersByCustomer,
  getOrders,
  updateOrder,
} = require("../controllers/ordersController.js");

const verifyToken = require("../middleware/verifyUser.js");
const verifyRole = require("../middleware/verifyRole.js");

const router = express.Router();

router.post("/", verifyToken, verifyRole("customer"), placeOrder);
router.get("/", verifyToken, verifyRole("chef", "admin"), getOrders);
router.get(
  "/customer",
  verifyToken,
  verifyRole("customer", "chef", "admin"),
  getOrdersByCustomer
);
router.put("/", verifyToken, verifyRole("chef"), updateOrder);

module.exports = router;
