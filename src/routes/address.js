const express = require("express");
const {
  AddAddress,
  GetAddress,
  UpdateAddress,
  DeleteAddress,
} = require("../controllers/addressController");
const router = express.Router();

router.post("/add-address", AddAddress);
router.put("/update-address/:id", UpdateAddress);
router.get("/get-address/:id", GetAddress);
router.delete("/delete-address/:id", DeleteAddress);

module.exports = router;
