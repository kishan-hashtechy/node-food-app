const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  addCart,
  updateCart,
  getAllCart,
  getSingleCart,
  deleteCart,
} = require("../controllers/cartController");

router.post("/add-cart", auth, addCart);
router.put("/update-cart", auth, updateCart);
router.get("/getall-cart", auth, getAllCart);
router.get("/getsingle-cart", auth, getSingleCart);
router.delete("/delete-cart", auth, deleteCart);

module.exports = router;
