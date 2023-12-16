const express = require("express");
const router = express.Router();
const UserController = require("../controllers");

router.post("/register", UserController.registerUser);

router.post("/login", UserController.loginUser);

router.post("/forgotpassword", UserController.forgotPassword);

module.exports = router;
