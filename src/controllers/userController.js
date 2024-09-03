const User = require("../models/user");
const yup = require("yup");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { hashPassword, comparePassword } = require("../libs/helpers/passwordHasher");
const Address = require("../models/address");
const paginate = require("../libs/common/paginate");
const { Op } = require("sequelize");
const Food = require("../models/food");
const { cartCodeGenerator } = require("../libs/common/cartCodeGenerator");
const Wishlist = require("../models/wishlist");
const Cart = require("../models/cart");

//@desc User SIGNUP
//@route POST / api/user/signup
//@access public

const signUp = async (req, res) => {
  try {
    const { fullName, email, password, userProfile, mobileNumber } = req.body;
    const cart_code = cartCodeGenerator();

    const userSignupSchema = yup.object({
      email: yup
        .string()
        .email("Invalid Email")
        .required("Please enter your email"),
      fullName: yup.string().min(4).required("Please enter your full name"),
      password: yup
        .string()
        .min(8, "Password must be 8 chars min")
        .max(16, "Password must be 16 chars max")
        .required("Please enter your password"),
      userProfile: yup.string().optional(),
      cart_code: yup.string().required("cart code is required"),
      mobileNumber: yup.string().required("Pleas ent mobile number"),
    });

    await userSignupSchema.validate({
      email,
      fullName,
      password,
      userProfile,
      cart_code,
      mobileNumber,
    });

    const hashedPassword = await hashPassword(password);

    const userData = {
      fullName,
      email,
      password: hashedPassword,
      status: "Active",
      cart_code,
      mobileNumber,
    };

    if (userProfile) {
      userData.userProfile = userProfile;
    }

    const isAlreadyExits = await User.findOne({ where: { email } });

    let newCartCode = cartCodeGenerator();

    let cartCodeExists = await User.findOne({
      where: { cart_code: newCartCode },
    });

    while (cartCodeExists) {
      newCartCode = cartCodeGenerator();
      userData.cart_code = newCartCode;
      cartCodeExists = await User.findOne({
        where: { cart_code: newCartCode },
      });
    }

    if (isAlreadyExits) {
      return res.status(400).send({ message: "Email already exists" });
    }

    const createUser = await User.create(userData);

    if (createUser) {
      return res.status(200).send({ message: "Signup successfully", createUser });
    } else {
      return res.status(400).send({ message: "Something went wrong" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
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

    if (!user) {
      return res.status(404).send({ message: "No user found" });
    }

    const isPasswordValid = await comparePassword(password, user?.password);

    if (user && isPasswordValid) {
      const accessToken = jwt.sign(
        {
          user: { email: user.email, id: user.id },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 24 * 60 * 60 }
      );

      const getWishlist = await Wishlist.findAll({ where: { user_id: user.id }, attributes: ['food_id'] })

      const cartData = await Cart.findAndCountAll({ where: { user_id: user.id, cart_code: user.cart_code }, attributes: ['food_id'] })

      return res.status(200).send({
        message: "Login Successfully",
        data: { accessToken },
        wishlist: getWishlist,
        cart: cartData,
      });
    } else {
      return res.status(401).send({ message: "Invalid email or password." });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ message: err.message || "Internal Server Error" });
  }
};

// UPDATE

const updateUser = async (req, res) => {
  try {
    const userId = req?.userId;

    const {
      fullName,
      email,
      password,
      mobileNumber,
      gender,
      userProfile,
      dob,
    } = req.body;

    const data = req.body;

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (user) {
      const userData = await User.update(data, { where: { id: userId } });

      if (userData) {
        return res.status(200).send({ message: "User Updated!!", userData });
      }
    } else {
      return res.status(404).send({ message: "Something went wrong !!!" });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ message: err.message || "INternal Server Error" });
  }
};

// GET
const getUser = async (req, res) => {
  try {
    const userId = req?.userId;

    if (!userId) {
      return res.status(400).send({ message: "user id not found" });
    }

    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: {
        model: Address,
        where: {
          userId,
          defaultAddress: true,
        },
      },
      order: [[Address, "createdAt", "DESC"]],
    });

    if (user) {
      return res.status(200).send({ message: "Successfully GET", data: user });
    } else {
      return res.status(404).send({ message: "Something went wrong !!!" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal Server Error" });
  }
};

// DELETE
const deleteUser = async (req, res) => {
  try {
    const userId = req?.params?.id;

    if (!userId) {
      return res.status(404).send({ message: "user Id not found" });
    }

    const user = await User.destroy({
      where: {
        id: userId,
      },
    });

    if (user) {
      return res.status(200).send({ message: "User deleted !!" });
    } else {
      return res.status(404).send({ message: "Something went wrong !!!" });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ message: err.message || "Internal Server Error" });
  }
};

const searchItems = async (req, res) => {
  try {
    const search = req.query.search || "";
    const limit = parseInt(req?.query?.limit) || 10;
    const page = parseInt(req?.query?.page) || 1;

    const searchData = await Food.findAndCountAll({
      where: {
        name: {
          [Op.iLike]: `%${search}%`,
        },
      },
      limit,
      offset: (page - 1) * limit,
    });

    const paginatedResult = paginate(
      page,
      searchData?.count,
      limit,
      searchData?.rows
    );

    if (searchData?.rows?.length) {
      return res.status(200).send({
        message: "Search successful",
        data: paginatedResult?.data,
        count: paginatedResult?.data?.length,
      });
    } else {
      return res.status(404).send({ message: "No data found" });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ message: err.message || "Internal Server Error" });
  }
};

module.exports = {
  signUp,
  updateUser,
  getUser,
  deleteUser,
  signIn,
  searchItems,
};
