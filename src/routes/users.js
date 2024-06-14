const express = require("express");
const { Signup, UpdateUser } = require("../controllers/userController");
const router = express.Router();

router.post("/signup", Signup);
router.post("/update-user", UpdateUser);

module.exports = router;
