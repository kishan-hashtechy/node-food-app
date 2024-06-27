const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const { addFood, getAllFood } = require("../controllers/adminConstroller");

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
router.get("/get-all-food", getAllFood);

module.exports = router;
