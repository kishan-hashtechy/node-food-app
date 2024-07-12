const User = require("../models/user");
const yup = require("yup");
const Order = require("../models/order");

const addOrder = async (req, res) => {
  try {
    const userId = req?.query?.userId;

    const { total_price, payment_status } = req?.body;

    const addOrderSchema = yup.object({
      total_price: yup.string().required("Total price is required"),
      payment_status: yup.string().required("Payment status is require"),
    });

    await addOrderSchema.validate(req.body);

    if (!userId) {
      return res.status(400).send({ message: "User id not found" });
    }

    const response = await User.findOne({
      where: {
        id: userId,
        attribute: [cart_code],
      },
    });
    const orderData = {
      total_price,
      payment_status,
      userId,
      cart_code: response,
    };

    if (response) {
      const response2 = await Order.create(orderData);

      if (response2) {
        return res.status(200).send({ messsage: "Order added successfully" });
      } else {
        return res
          .status(400)
          .send({ messsage: "Something occured while creating order" });
      }
    } else {
      return res.status(404).send({ messsage: "No data found" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal server error !!" });
  }
};

// //Update cart

const updateOrder = async (req, res) => {
  try {
    const orderId = req?.params?.id;
    const { orderStatus } = req?.body;

    if (!orderId) {
      return res.status(400).send({ message: "Order status not found" });
    }

    const response = await Order.update(orderStatus, {
      where: { id: orderId },
    });

    if (response) {
      return res.status(200).send({ message: "Updated order status" });
    } else {
      return res.status(400).send({ message: "Failed to updated" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal server error!!" });
  }
};

//GET ALL ORDER

const getAllOrder = async (req, res) => {
  try {
    const userId = req?.query?.userId;
    if (!userId) {
      return res.status(400).send({ message: "user id found", data: record });
    }
    const record = await Order.findAll({
      where: {
        id: userId,
      },
    });

    if (record?.length) {
      return res.status(200).send({ message: "Successful get", data: record });
    } else {
      return res.status(404).send({ message: "Something went wrong" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal server error" });
  }
};

//GET SINGLE ORDER

const getSingleOrder = async (req, res) => {
  try {
    const userId = req?.query?.userId;

    if (!userId) {
      return res.status(400).send({ message: "No data found", data: record });
    }

    const record = await User.findOne({
      where: {
        id: userId,
        attribute: [cart_code],
      },
    });

    if (record) {
      const record2 = await Order.findOne({ where: { cart_code: record } });

      if (record2) {
        return res
          .status(200)
          .send({ message: "Succeessful get", data: record2 });
      } else {
        return res.status(404).send({ message: "No order Data found" });
      }
    } else {
      return res.status(404).send({ message: "No user found" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal server error" });
  }
};

module.exports = {
  addOrder,
  getAllOrder,
  getSingleOrder,
  updateOrder,
};
