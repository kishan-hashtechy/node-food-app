const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  addCart,
  updateCart,
  getCart,
  deleteCart,
} = require("../controllers/cartController");

router.post("/add-cart", auth, addCart);
router.patch("/update-cart", auth, updateCart);
router.get("/get-cart", auth, getCart);
router.delete("/delete-cart", auth, deleteCart);

module.exports = router;
