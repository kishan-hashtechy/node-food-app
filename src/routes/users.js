const express = require("express");
const multer = require("multer")
const fs = require('fs')
const router = express.Router();

const auth = require("../middleware/auth");
const {
  signUp,
  updateUser,
  getUser,
  deleteUser,
  signIn,
} = require("../controllers/userController");
const { date } = require("joi");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = `./public/profile_img/`
    fs.mkdirSync(path, { recursive: true })
    return cb(null, path)
    // cb(null, "public/profile_img/");
  },
  filename: function (req, file, cb) {
    req.body.userProfile =`/profile_img/` + Date.now() + "-" + file.originalname
    cb(null,  Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/signup", signUp);
router.put("/update-user/:id", upload.single("userProfile") ,updateUser);
router.get("/get-user/:id", auth, getUser);
router.delete("/delete-user/:id", deleteUser);
router.post("/signin", signIn);

module.exports = router;
