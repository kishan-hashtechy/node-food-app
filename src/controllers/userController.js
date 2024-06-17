const User = require("../models/user");
const Address = require("../models/address");
const {
  hashPassword,
  comparePassword,
} = require("../libs/helpers/passwordHasher");

// @desc User SIGNUP
// @route POST /api/user/signup
// @access public
const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobileNumber, gender } = req.body;

    const hashedPassword = await hashPassword(password);

    const UserData = {
      fullName,
      email,
      password: hashedPassword,
      mobileNumber,
      gender,
      userStatus: "Active",
    };

    const isAlreadyExits = await User.findOne({ where: { email } });

    if (isAlreadyExits) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const response = await User.create({ UserData });

    if (response) {
      return res.status(200).json({ message: "SignUp Successfully !!" });
    } else {
      return res.status(400).json({ message: "Something Went Wrong !" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { signUp };
