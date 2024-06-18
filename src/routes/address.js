const express = require("express");
const {
  addAddress,
  getAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/addressController");
const router = express.Router();

router.post("/add-address", addAddress);
router.put("/update-address/:id", updateAddress);
router.get("/get-address/:id", getAddress);
router.delete("/delete-address/:id", deleteAddress);

module.exports = router;
