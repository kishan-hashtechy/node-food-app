const express = require("express");
const {
  Signup,
  UpdateUser,
  GetUser,
  DeleteUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/signup", Signup);
router.put("/update-user/:id", UpdateUser);
router.get("/get-user/:id", GetUser);
router.delete("/delete-user/:id", DeleteUser);

module.exports = router;
