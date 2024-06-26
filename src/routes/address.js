const express = require("express");
const auth = require("../middleware/auth");
const {
  addAddress,
  getAllAddress,
  getSingleAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/addressController");
const router = express.Router();

router.post("/add-address", auth, addAddress);
router.put("/update-address/:id", auth, updateAddress);
router.get("/getall-address", auth, getAllAddress);
router.get("/get-single-address/:id", auth, getSingleAddress);
router.delete("/delete-address/:id", deleteAddress);

module.exports = router;
