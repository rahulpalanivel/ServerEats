const express = require("express");
const {
  placeOrder,
  getOrdersByCustomer,
  getOrder,
  getOrders,
  getOrdersByChef,
  updateOrder,
} = require("../controllers/ordersController.js");

const verifyToken = require("../middleware/verifyUser.js");
const verifyRole = require("../middleware/verifyRole.js");

const router = express.Router();

router.post("/", verifyToken, verifyRole("customer"), placeOrder);
router.get("/", verifyToken, verifyRole("chef", "admin"), getOrders);
router.get("/id/:id", verifyToken, verifyRole("chef", "admin"), getOrder);
router.get(
  "/customer",
  verifyToken,
  verifyRole("customer", "chef", "admin"),
  getOrdersByCustomer
);
router.get("/chef", verifyToken, verifyRole("chef", "admin"), getOrdersByChef);
router.put("/", verifyToken, verifyRole("chef"), updateOrder);

module.exports = router;
