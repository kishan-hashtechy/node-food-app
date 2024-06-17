const express = require("express");
const cors = require("cors");
const sequelizeInstance = require("./src/libs/common/connect");
const User = require("./src/models/user");

if (process.env.NODE_EVN != "production") {
  require("dotenv").config();
}

const app = express();
app.use(cors());
app.use(express.json());

// app.use("/api/user", require("./src/routes/auth"));
// router.route("/signup").post(signUp);

app.post("/api/user", async (req, res) => {
  try {
    console.log(req.body);
    const { fullName, email, password, mobileNumber, gender } = req.body;
    console.log(fullName);

    // const hashedPassword = await hashPassword(password);

    const UserData = {
      fullName,
      email,
      password,
      mobileNumber,
      gender,
      userStatus: "Active",
    };

    const isAlreadyExits = await User.findOne({ where: { email } });

    if (isAlreadyExits) {
      return res.status(400).json({ message: "Email already exists" });
    }

    await User.create(UserData).then((result) => {
      res.status(201).send(result);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

try {
  sequelizeInstance.authenticate();
  sequelizeInstance.sync({ force: true });
  console.log("Connected to DB");
} catch (error) {
  console.error("Failed to connect DB", error);
}

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
