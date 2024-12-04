const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const {
  addAddress,
  getAllAddress,
  getSingleAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/addressController");

router.post("/add-address", auth, addAddress);
router.patch("/update-address/:id", auth, updateAddress);
router.get("/getall-address", auth, getAllAddress);
router.get("/get-single-address/:id", auth, getSingleAddress);
router.delete("/delete-address/:id", deleteAddress);

module.exports = router;
