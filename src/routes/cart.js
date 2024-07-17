const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  addCart,
  updateCart,
  // getAllCart,
  getCart,
  deleteCart,
} = require("../controllers/cartController");

router.post("/add-cart", auth, addCart);
router.put("/update-cart", auth, updateCart);
router.get("/get-cart", auth, getCart);
router.delete("/delete-cart", auth, deleteCart);

module.exports = router;
