const express = require("express");
const { AddAddress } = require("../controllers/addressController");
const router = express.Router();

router.post("/", AddAddress);

module.exports = router;
