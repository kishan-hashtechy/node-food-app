const { string } = require("joi");
const Address = require("../models/address");
const User = require("../models/user");
const yup = require("yup");
const { json } = require("sequelize");
const jwt = require("jsonwebtoken");

const addAddress = async (req, res) => {
  try {
    const {
      userId,
      addressLine1,
      addressLine2,
      pincode,
      city,
      type,
      receiverName,
      receiverNumber,
    } = req.body;
    const token = req.headers.authorization;
    const userData = jwt.decode(token);
    console.log(userData);
    if (!userData) {
      return res
        .status(400)
        .send({ message: "Invaild or not found user data..." });
    }

    const addAddressSchema = yup.object({
      addressLine1: yup.string().required("Please enter your address"),
      addressLine2: yup.string(),
      pincode: yup.string().required("Please enter your pincode"),
      city: yup.string().required("Please enter your city"),
      type: yup.string().required("Please enter your address type"),
      recuverName: yup.string(),
      receiverNumber: yup.string(),
    });

    await addAddressSchema.validate(req.body);

    const addressData = {
      userId: userData?.user?.id,
      addressLine1,
      addressLine2,
      pincode,
      city,
      type,
      receiverName,
      receiverNumber,
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
const updateAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    console.log(addressId);
    const {
      addressLine1,
      addressLine2,
      pincode,
      city,
      type,
      receiverName,
      receiverNumber,
    } = req.body;

    const data = req.body;
    console.log(data);

    const record = await Address.findOne({
      where: {
        id: addressId,
      },
    });

    if (record) {
      const response = await Address.update(data, { where: { id: addressId } });
      console.log(response);
      if (response) {
        return res.json({ message: "Address Update !!", code: 200, response });
      }
    } else {
      return res.json({ message: "No record found", code: 404 });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//GET
const getAllAddress = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.json({
        code: 400,
        message: "user id not found",
      });
    }

    const record = await Address.findAll({
      where: {
        userId,
      },
    });

    if (record.length) {
      return res.json({
        message: "Successfully GET",
        data: record,
        code: 200,
      });
    } else {
      return res.json({ message: "No data found", code: 404 });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET-SINGLE-ADDRESS

const getSingleAddress = async (req, res) => {
  try {
    const addressId = req.params.id;

    if (!addressId) {
      return res.json({ message: "Address is not found", code: 400 });
    }

    const record = await Address.findOne({
      where: {
        id: addressId,
      },
    });

    if (record) {
      return res.json({ message: "Successfull get", data: record, code: 200 });
    } else {
      return res.json({ message: "No data found", code: 404 });
    }
  } catch (error) {
    return res.json({ message: "Internal server error!!!", code: 500 });
  }
};

//DELETE
const deleteAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const token = req.headers.authorization;
    const userData = jwt.decode(token);
    //validation
    if (addressId) {
      return json({
        code: 400,
        message: "user id not found",
      });
    }

    const response = await Address.destroy({
      where: {
        id: addressId,
      },
    });

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

module.exports = {
  addAddress,
  updateAddress,
  getAllAddress,
  getSingleAddress,
  deleteAddress,
};
