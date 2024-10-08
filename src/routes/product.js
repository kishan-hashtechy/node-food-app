const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const fs = require("fs");

const {
  addFood,
  updateFood,
  getAllFood,
  getSingleFood,
  deleteFood,
} = require("../controllers/productController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = `./public/profile_img/`;
    fs.mkdirSync(path, { recursive: true });
    return cb(null, path);
  },
  filename: function (req, file, cb) {
    req.body.foodImage = `/profile_img/` + Date.now() + "-" + file.originalname;
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/add-food", upload.single("foodImage"), addFood);
router.patch("/update-food/:id", upload.single("foodImage"), updateFood);
router.get("/getall-food", getAllFood);
router.get("/getsingle-food", getSingleFood);
router.delete("/delete-food/:id", deleteFood);

module.exports = router;
