const User = require("../models/user");
const yup = require("yup");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  hashPassword,
  comparePassword,
} = require("../libs/helpers/passwordHasher");

//@desc User SIGNUP
//@route POST / api/user/signup
//@access public

const signUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const userSignupSchema = yup.object({
      email: yup
        .string()
        .email("Invalid Email")
        .required("Please enter your email"),
      fullName: yup.string().min(4).required("Please enter your full name"),
      password: yup.string().min(6).required("Please enter your password"),
      // mobileNumber: yup.string().required("Please enter your mobile number"),
      // gender: yup.string().required("Please enter your gender"),
    });

    await userSignupSchema.validate({
      email,
      fullName,
      password,
      // mobileNumber,
      // gender,
    });
    const hashedPassword = await hashPassword(password);

    const UserData = {
      fullName,
      email,
      password: hashedPassword,
      // mobileNumber,
      // gender,
      userStatus: "Active",
    };

    const isAlreadyExits = await User.findOne({ where: { email } });

    if (isAlreadyExits) {
      return res.status(400).send({ message: "Email already exists" });
    }

    const response = await User.create(UserData);

    if (response) {
      return res.status(200).send({ message: "Signup successfully", response });
    } else {
      return res.status(400).send({ message: "Something went wrong" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error", error });
  }
};

// @DESC: SingIn User

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "All fields are mandatory!!" });
    }

    const user = await User.findOne({ where: { email } });

    const isPasswordValid = await comparePassword(password, user?.password);

    if (user && isPasswordValid) {
      const accessToken = jwt.sign(
        {
          user: { email: user.email, id: user.id },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 24 * 60 * 60 }
      );

      return res
        .status(200)
        .send({ message: "Login Successfully", data: { accessToken, user } });
    } else {
      return res.status(400).send({ message: "Invalid email or password." });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal server error!!" });
  }
};

// UPDATE

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      fullName,
      email,
      password,
      mobileNumber,
      gender,
      userProfile,
      address,
      dob,
    } = req.body;

    const data = req.body;
    const record = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (record) {
      const response = await User.update(data, { where: { id: userId } });

      if (response) {
        return res.status(200).send({ message: "User Update !!", response });
      }
    } else {
      return res.status(404).send({ message: "Something went wrong !!!" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

// GET
const getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).send({ message: "user id not found" });
    }

    const record = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (record) {
      return res
        .status(200)
        .send({ message: "Successfully GET", data: record });
    } else {
      return res.status(404).send({ message: "Something went wrong !!!" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

// DELETE
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    //validation
    if (!userId) {
      return res.status(400).send({ message: "user Id not found" });
    }

    const response = await User.destroy({
      where: {
        id: userId,
      },
    });

    if (response) {
      return res.status(200).send({ message: "User deleted !!" });
    } else {
      return res.status(404).send({ message: "Something went wrong !!!" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = { signUp, updateUser, getUser, deleteUser, signIn };
