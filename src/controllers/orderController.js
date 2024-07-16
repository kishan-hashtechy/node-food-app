const User = require("../models/user");
const Order = require("../models/order");
const yup = require("yup");
const { cartCodeGenerator } = require("../libs/common/cartCodeGenerator");
const Cart = require("../models/cart");
const Food = require("../models/food");
const { Op } = require("sequelize");

const createOrder = async (req, res) => {
  try {
    const userId = req?.userId;
    const { payment_method } = req?.body;

    if (!userId) {
      return res.status(400).status({ messsage: "user id not found" });
    }

    const createOrderSchema = yup.object({
      payment_method: yup.string().required("payment method is required"),
    });

    await createOrderSchema.validate({ payment_method });

    const findCartCode = await User.findOne({
      where: { id: userId },
      attributes: ["cart_code"],
    });

    const cartData = await Cart.findAll({
      where: { userId, cart_code: findCartCode?.cart_code },
      attributes: ["no_of_item", "cart_code"],
      include: [Food],
    });

    if (!cartData) {
      return res
        .status(400)
        .send({ messsage: "Please add an Item to the Cart" });
    }

    let total_quantity = 0,
      total_price = 0;

    cartData?.map((items) => {
      total_quantity += items?.no_of_item;
      total_price += items?.no_of_item * items?.Food?.price;
    });

    const orderData = {
      userId,
      total_price,
      total_quantity,
      cart_code: findCartCode?.cart_code,
      payment_method,
    };

    if (findCartCode) {
      let newCartCode = cartCodeGenerator();

      let cartCodeExists = await User.findOne({
        where: { cart_code: newCartCode },
      });

      while (cartCodeExists) {
        newCartCode = cartCodeGenerator();
        cartCodeExists = await User.findOne({
          where: { cart_code: newCartCode },
        });
      }

      const updateCart = await Cart.update(
        { cartStatus: "confirmed" },
        { where: { cart_code: findCartCode?.cart_code } }
      );

      if (updateCart > 0) {
        const updateUser = await User.update(
          { cart_code: newCartCode },
          { where: { id: userId } }
        );

        if (updateUser > 0) {
          const createOrderTable = await Order.create(orderData);
          if (createOrderTable) {
            return res
              .status(200)
              .send({ messsage: "Order added successfully" });
          }
        } else {
          return res
            .status(400)
            .send({ messsage: "Something occured while creating order" });
        }
      } else {
        return res
          .status(400)
          .send({ messsage: "something occured while updating cart" });
      }
    } else {
      return res.status(404).send({ messsage: "No data found" });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ messsage: err.messsage || "Internal Server Error" });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const userId = req?.userId;

    if (!userId) {
      return res.status(404).send({ messsage: "user id not found" });
    }

    const findOrder = await Order.findAll({ where: { userId, order_status: 'delivered' }, order:['createdAt', 'DESC'] });

    if (findOrder?.length) {
      const foodData = await Cart.findAll({
        where: { where: { cart_code: findOrder?.cart_code } },
        include: [Food],
      });

      if (foodData) {
        return res
          .status(200)
          .send({ messsage: "successfully get", data: { findOrder, foodData } });
      }
    } else {
      return res
        .status(400)
        .send({ messsage: "Something went wrong while fetching the data" });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ messsage: err.messsage || "Internal Server Error" });
  }
};

const getCurrenrtOrder = async (req, res) => {
  try {
    const userId = req?.userId;

    if (!userId) {
      return res.status(400).send({ messsage: "user id not found" });
    }

    const orderData = await Order.findOne({
      where: { 
        userId,
        [Op.not]:[
          {order_status: 'delivered'},
        ],
      },
      order: [["createdAt", "DESC"]],
    });

    if (orderData) {
      const cartData = await Cart.unscoped().findAll({
        where: { cart_code: findOrder?.cart_code },
        include: [Food],
      });

      if (cartData) {
        return res.status(200).send({
          messsage: "Successfully Fetched",
          data: { orderData, cartData },
        });
      }else{
        return res.status(400).send({ messsage: 'no cart data found' })
      }
    } else {
      return res.status(400).send({ messsage: "no current order found" });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ messsage: err.messsage || "Internal Server Error" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req?.query?.orderId;

    if (!orderId) {
      return res.status(400).send({ messsage: "order id not found" });
    }

    const deleteOrder = await Order.destroy({ where: { id: orderId } });

    if (deleteOrder) {
      return res.status(200).send({ messsage: "Updated Order status" });
    } else {
      return res.status(400).send({ messsage: "Failed to update" });
    }
  } catch (err) {
    return res.status(500).send({ messsage: "Internal Server Error" });
  }
};

module.exports = { createOrder, getAllOrder, getCurrenrtOrder, deleteOrder };
