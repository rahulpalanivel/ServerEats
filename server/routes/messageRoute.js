const express = require("express");
const { newMessage, getMessage } = require("../controllers/messageController");

const verifyToken = require("../middleware/verifyUser.js");
const verifyRole = require("../middleware/verifyRole.js");

const router = express.Router();

router.post("/", verifyToken, verifyRole("chef", "customer"), newMessage);
router.get("/", verifyToken, verifyRole("customer"), getMessage);

module.exports = router;
