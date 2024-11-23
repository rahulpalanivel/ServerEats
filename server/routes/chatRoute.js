const express = require("express");
const { getChat, getAllChats } = require("../controllers/chatController");

const verifyToken = require("../middleware/verifyUser.js");
const verifyRole = require("../middleware/verifyRole.js");

const router = express.Router();

router.get("/", verifyToken, verifyRole("chef"), getAllChats);
router.post("/", verifyToken, verifyRole("chef", "customer"), getChat);

module.exports = router;
