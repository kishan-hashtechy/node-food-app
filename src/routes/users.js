const express = require("express");
const auth = require("../middleware/auth");
const {
  signUp,
  updateUser,
  getUser,
  deleteUser,
  signIn,
} = require("../controllers/userController");
const router = express.Router();

router.post("/signup", signUp);
router.put("/update-user/:id", updateUser);
router.get("/get-user/:id", auth, getUser);
router.delete("/delete-user/:id", deleteUser);
router.post("/signin", signIn);

module.exports = router;
