const cart = require("../models/cart");
const Cart = require("../models/cart");
const Food = require("../models/food");
const User = require("../models/user");
const { addFood } = require("./productController");
const yup = require("yup");

const addCart = async (req, res) => {
  try {
    const userId = req?.query?.userId;
    const foodId = req?.query?.foodId;

    const { no_of_item } = req.body;
    // cart status --
    const addCartSchema = yup.object({
      no_of_item: yup.string().required("Number of item is required"),
      cart_status: yup.string().required("Cart status is required"),
    });

    await addCartSchema.validate(req.body);

    if (!userId || !foodId) {
      return res.status(400).send({ message: "user id or food id not found" });
    }

    const response = await User.findOne({
      where: {
        id: userId,
        attribute: [cart_code],
      },
    });

    const cartData = {
      no_of_item,
      // cart_status,
      userId,
      foodId,
      cart_code: response?.cart_code,
    };

    if (response) {
      const response2 = await Cart.create(cartData);

      if (response2) {
        return res.status(200).send({ message: "Successfully Created" });
      } else {
        return res
          .status(400)
          .send({ message: "Something Occured while creating the data" });
      }
    } else {
      return res.status(400).status({ message: "No user Found" });
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

    const cartId = req.params.id;

    const { no_of_item } = req.body;

    const updateCartSchema = yup.object({
      no_of_items: yup.string().required("Number of items is required"),
      cart_status: yup.string().required("Cart status is required"),
    });

    await updateCartSchema.validate({ no_of_item });

    // const record = await Cart.findOne({
    //   where: {
    //     id: cartId,
    //   },
    // });

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
    const cartId = req.params.id;
    if (!cartId) {
      return res.status(400).send({ message: "No data found", data: record });
    }
    const record = await Cart.findAll({
      where: {
        id: cartId,
      },
    });

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
      return res.status(400).send({ message: "No data found", data: record });
    }
    const response = await User.findOne({
      where: {
        id: userId,
        attribute: [cart_code],
      },
    });

    if (response) {
      const response2 = await Cart.findAll({
        where: { cart_code: response.cart_code },
      });

      if (response2) {
        return res
          .status(200)
          .send({ message: "Successfully fetched data", data: response2 });
      } else {
        return res.status(400).status({ message: "No Cart Data Found" });
      }
    } else {
      return res.status(400).send({ message: "No User Data Found" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal server error !!" });
  }
};

//DELETE CART
// remove item
const deleteCart = async (req, res) => {
  try {
    const cartId = req?.query?.foodId;

    if (!cartId) {
      return res.status(400).send({ message: "No data found", data: record });
    }
    const record = await Cart.destroy({
      where: {
        id: cartId,
      },
    });

    if (record) {
      return res.status(200).send({ message: "Cart deleted", data: record });
    } else {
      return res.status(404).send({ message: "Something went wrong" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal server error !!" });
  }
};

module.exports = { addCart, updateCart, getSingleCart, getAllCart, deleteCart };
