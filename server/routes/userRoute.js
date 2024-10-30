const express = require("express");
const {
  UserLogin,
  UserRegister,
  getUser,
} = require("../controllers/userController.js");

const verifyToken = require("../middleware/verifyUser.js");
const verifyRole = require("../middleware/verifyRole.js");

const router = express.Router();

router.post("/signup", UserRegister);
router.post("/signin", UserLogin);
router.get("/", verifyToken, verifyRole("admin"), getUser);

module.exports = router;
