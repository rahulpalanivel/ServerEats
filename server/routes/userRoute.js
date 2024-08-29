const express = require("express");
const { UserLogin, UserRegister } = require("../controllers/userController.js");

const router = express.Router();

router.post("/signup", UserRegister);
router.post("/signin", UserLogin);

module.exports = router;
