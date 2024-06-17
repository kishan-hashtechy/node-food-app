const express = require("express");
const router = express.Router();
const { signUp } = require("../controllers/userController");

// Auth Routes
router.route("/signup").post(signUp);

module.exports = router;
