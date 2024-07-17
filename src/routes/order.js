const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrder,
  getCurrenrtOrder,
  deleteOrder,
} = require("../controllers/orderController");
const auth = require("../middleware/auth");

router.get("/get-current-order", auth, getCurrenrtOrder);
router.get("/get-all-order", auth, getAllOrder);
router.post("/create-order", auth, createOrder);
router.delete("/delete-order", auth, deleteOrder);

// Ref for UPDATE NAME-------------------------------------------
// const {
//   addOrder,
//   updateOrder,
//   getSingleOrder,
//   getAllOrder,
// } = require("../controllers/orderController");

// router.post("/add-order", addOrder);
// router.put("/update-order", updateOrder);
// router.get("/getsingle-order", getSingleOrder);
// router.get("/getall-order", getAllOrder);
module.exports = router;
