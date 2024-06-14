const User = require("../models/user");
const Address = require("../models/address");

const {
  hashPassword,
  comparePassword,
} = require("../libs/helpers/passwordHasher");

//@desc User SIGNUP
//@route POST / api/user/signup
//@access public

const Signup = async (req, res) => {
  try {
    const { fullname, email, password, mobileno, gender } = req.body;

    // const hashedPassword = await hashPassword(password);

    const UserData = {
      fullname,
      email,
      password,
      mobileno,
      gender,
      userstatus: "Active",
    };

    const isAlreadyExits = await User.findOne({ where: { email } });

    console.log(isAlreadyExits);
    if (isAlreadyExits) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const response = await User.create(UserData);

    if (response) {
      return res.status(200).json({ message: "Signup successfully", response });
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// UPDATE

const UpdateUser = async (req, res) => {
  try {
    console.log("adfdasf");
    res.end("success");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// GET

// DELETE

module.exports = { Signup, UpdateUser };
