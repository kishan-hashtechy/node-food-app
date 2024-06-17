const User = require("../models/user");
const Address = require("../models/address");
const yup = require("yup");

const {
  hashPassword,
  comparePassword,
} = require("../libs/helpers/passwordHasher");
const { where } = require("sequelize");
const { use } = require("../routes/users");

//@desc User SIGNUP
//@route POST / api/user/signup
//@access public

const Signup = async (req, res) => {
  try {
    const {
      fullname,
      email,
      password,
      mobileno,
      gender,

      // dob,
    } = req.body;

    const UserSignupSchema = yup.object({
      email: yup
        .string()
        .email("Invalid Email")
        .required("Please enter your email"),
      fullname: yup.string().required("Please enter your full name"),
      password: yup.string().min(6).required("Please enter your password"),
      mobileno: yup.string().required("Please enter your mobileno"),
      gender: yup.string().required("Please enter your gender"),
      // profile_image: string(),
      // dob: yup.date(),
    });

    // const hashedPassword = await hashPassword(password);
    const UserData = {
      fullname,
      email,
      password,
      mobileno,
      gender,

      // dob,
      userstatus: "Active",
    };

    const isAlreadyExits = await User.findOne({ where: { email } });

    // console.log(isAlreadyExits);
    if (isAlreadyExits) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const response = await User.create(UserData);

    if (response) {
      return res.status(200).json({ message: "Signup successfully", response });
    } else {
      return res
        .status(400)
        .json({ message: "Something went wrong", code: 404 });
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// UPDATE

const UpdateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      fullname,
      email,
      password,
      mobileno,
      gender,
      profile_image,
      address,
      dob,
      status,
    } = req.body;

    console.log(userId);

    const data = req.body;
    const record = await User.findOne({
      where: {
        id: userId,
      },
    });

    // console.log(record);

    // const UserUpdateSchema = yup.object({
    //   email: yup
    //     .string()
    //     .email("Invalid Email")
    //     .required("Please enter your email"),
    //   fullname: yup.string().required("Please enter your full name"),
    //   password: yup.string().min(6).required("Please enter your password"),
    //   mobileno: yup.string().required("Please enter your mobileno"),
    //   gender: yup.enum().required("Please enter your gender"),
    //   profile_image: string().required("Please select your image"),
    //   addressline1: yup.string().required(),
    //   addressline2: yup.string().required(),
    //   pincode: yup.string().required("Please enter your pincode"),
    //   type: yup.enum().required("Please select your address type"),
    //   city: yup.string().required("Please enter your city"),
    //   dob: yup.date().required("Please enter your date of birth"),
    // });

    if (record) {
      const response = await User.update(data, { where: { id: userId } });

      if (response) {
        return res.json({ message: "User Update !!", code: 200, response });
      }
    } else {
      return res.json({ message: "Something went wrong !!!", code: 404 });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET
const GetUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);

    const record = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (record) {
      return res.json({
        message: "Successfully GET",
        data: record,
        code: 200,
      });
    } else {
      return res.json({ message: "Something went wrong !!!", code: 404 });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// DELETE
const DeleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    //validation
    const UserDeleteSchema = yup.object({
      id: yup.string().required("User Id required"),
    });

    const response = await User.destroy({
      where: {
        id: userId,
      },
    });

    if (response) {
      return res.json({ message: "User deleted !!", code: 200 });
    } else {
      return res.json({ message: "Something went wrong !!!", code: 404 });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { Signup, UpdateUser, GetUser, DeleteUser };
