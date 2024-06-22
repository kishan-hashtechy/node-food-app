const { string } = require("joi");
const Address = require("../models/address");
const User = require("../models/user");
const yup = require("yup");
const { ENUM } = require("sequelize");
const { use } = require("../routes/users");

const AddAddress = async (req, res) => {
  try {
    const {
      userId,
      addressLine1,
      addressLine2,
      pincode,
      city,
      type,
      receiver_name,
      receiver_contactno,
    } = req.body;

    const AddAddressSchema = yup.object({
      addressLine1: yup.string().required("Please enter your address"),
      pincode: yup.string().required("Please enter your pincode"),
      city: yup.string().required("Please enter your city"),
      type: yup.string().required("Please enter your address type"),
      receiver_name: yup.string(),
      receiver_contactno: yup.string(),
    });

    const addressData = {
      userId,
      addressLine1,
      addressLine2,
      pincode,
      city,
      type,
      receiver_name,
      receiver_contactno,
    };

    // const isAlreadyExits = await Address.findOne({ where: { userId } });

    // if (isAlreadyExits) {
    //   return res.status(400).json({ message: "userid already exists" });
    // }

    const response = await Address.create(addressData);

    if (response) {
      return res
        .status(200)
        .json({ message: "Address add successfully", response });
    } else {
      return res
        .status(400)
        .json({ message: "Something went wrong", code: 404 });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error" });
  }
};

//UPDATE
const UpdateAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const {
      addressLine1,
      addressLine2,
      pincode,
      city,
      type,
      receiver_name,
      receiver_contactno,
    } = req.body;

    const data = req.body;
    const record = await Address.findOne({
      where: {
        id: addressId,
      },
    });

    console.log(record);

    if (record) {
      const response = await Address.update(data, { where: { id: addressId } });
      if (response) {
        return res.json({ message: "Address Update !!", code: 200, response });
      }
    } else {
      return res.json({ message: "Something went wrong !!!", code: 404 });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//GET
const GetAddress = async (req, res) => {
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

//DELETE
const DeleteAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    //validation
    const UserDeleteSchema = yup.object({
      id: yup.string().required("Address Id required"),
    });

    const response = await Address.destroy({
      where: {
        id: addressId,
      },
    });

    console.log(response);

    if (response) {
      return res.json({ message: "Address deleted !!", code: 200 });
    } else {
      return res.json({ message: "Something went wrong !!!", code: 404 });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { AddAddress, UpdateAddress, GetAddress, DeleteAddress };
