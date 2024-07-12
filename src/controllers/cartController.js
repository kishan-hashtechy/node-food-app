const Cart = require("../models/cart");
const Food = require("../models/food");
const User = require("../models/user");
const { use } = require("../routes/product");
const { addFood } = require("./productController");
const yup = require("yup");

const addCart = async (req, res) => {
  try {
    const userId = req?.query?.userId;
    const foodId = req?.query?.foodId;

    if (!userId || !foodId) {
      return res.status(400).send({ message: "User id or food id not found" });
    }

    const response = await User.findOne({
      where: {
        id: userId,
      },
      attributes: ["cart_code"],
    });

    if (!response) {
      return res.status(400).send({ message: "No user found" });
    }

    const cartData = {
      user_id: userId,
      food_id: foodId,
      cart_code: response.cart_code,
      no_of_item: 3,
    };
    console.log("test ==>", cartData);

    const response2 = await Cart.create(cartData);

    if (response2) {
      return res
        .status(200)
        .send({ message: "Successfully Created", data: response2 });
    } else {
      return res
        .status(400)
        .send({ message: "Something occurred while creating the data" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal server error" });
  }
};

//Update Cart

const updateCart = async (req, res) => {
  try {
    const userId = req?.query?.userId;
    const foodId = req?.query?.foodId;
    const cartId = req?.query?.cartId;

    const { no_of_item } = req.body;

    const updateCartSchema = yup.object({
      no_of_item: yup.string().required("Number of items is required"),
    });

    await updateCartSchema.validate({ no_of_item });

    const response = await Cart.update(
      { no_of_item },
      { where: { id: cartId } }
    );

    if (response) {
      return res.status(200).send({ message: "Cart Update", response });
    } else {
      return res.status(404).send({ message: "Cart item not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal server error !!" });
  }
};

//GET ALL CART

const getAllCart = async (req, res) => {
  try {
    const record = await Cart.findAll({});

    if (record) {
      return res.status(200).send({ message: "Successful get", data: record });
    } else {
      return res.status(404).send({ message: "No data found" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal server error !!" });
  }
};

//GET SINGLE CART

const getSingleCart = async (req, res) => {
  try {
    const userId = req?.query?.userId;
    if (!userId) {
      return res.status(400).send({ message: "No user id found" });
    }

    const response = await User.findOne({
      where: {
        id: userId,
      },
      attributes: ["cart_code"],
    });

    if (!response) {
      return res.status(400).send({ message: "No user found" });
    }

    const cartItems = await Cart.findAll({
      where: { cart_code: response.cart_code, cartStatus: "pending" },
      include: [Food],
    });

    if (cartItems.length > 0) {
      return res
        .status(200)
        .send({ message: "Successfully fetched data", data: cartItems });
    } else {
      return res.status(400).send({ message: "No cart data found" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal server error" });
  }
};

// REMOVE ITEM

const deleteCart = async (req, res) => {
  try {
    const cartId = req?.query?.cartId;
    const userId = req?.query?.userId;
    const foodId = req?.query?.foodId;

    if (!cartId || !userId || !foodId) {
      return res.status(400).send({ message: "Parameter missing.." });
    }

    const record = await Cart.destroy({
      where: {
        id: cartId,
        user_id: userId,
        food_id: foodId,
      },
    });
    console.log(record);

    if (record) {
      return res.status(200).send({ message: "Item removed successfully.." });
    } else {
      return res.status(500).send({ message: "Something went wrong" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal server error !!" });
  }
};

module.exports = { addCart, updateCart, getSingleCart, getAllCart, deleteCart };
