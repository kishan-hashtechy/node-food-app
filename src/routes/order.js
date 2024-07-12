const express = require("express");
const router = express.Router();

const {
  addOrder,
  updateOrder,
  getSingleOrder,
  getAllOrder,
} = require("../controllers/orderController");

router.post("/add-order", addOrder);
router.put("/update-order", updateOrder);
router.get("/getsingle-order", getSingleOrder);
router.get("/getall-order", getAllOrder);

module.exports = router;
