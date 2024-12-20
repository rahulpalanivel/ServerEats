const express = require("express");
const {
  UserLogin,
  UserRegister,
  getUser,
  getUserById,
  updateUser,
} = require("../controllers/userController.js");

const verifyToken = require("../middleware/verifyUser.js");
const verifyRole = require("../middleware/verifyRole.js");

const router = express.Router();

router.post("/signup", UserRegister);
router.post("/signin", UserLogin);
router.get("/", verifyToken, verifyRole("admin"), getUser);
router.get("/:id", verifyToken, verifyRole("admin"), getUserById);
router.put("/", verifyToken, verifyRole("admin"), updateUser);

module.exports = router;
