const Address = require("../models/address");
const yup = require("yup");
const jwt = require("jsonwebtoken");

const addAddress = async (req, res) => {
  try {
    const {
      addressLine1,
      addressLine2,
      pincode,
      city,
      type,
      receiverName,
      receiverNumber,
    } = req.body;

    const userId = req.userId;

    if (!userId) {
      return res.status(400).send({ message: "User id not found." });
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
      userId,
      addressLine1,
      addressLine2,
      pincode,
      city,
      type,
      receiverName,
      receiverNumber,
    };

    const response = await Address.create(addressData);

    if (response) {
      return res
        .status(200)
        .send({ message: "Address add successfully", response });
    } else {
      return res.status(400).send({ message: "Something went wrong" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

//UPDATE
const updateAddress = async (req, res) => {
  try {
    const addressId = req.params.id;

    if (!addressId) {
      return res.status(400).send({ message: "address id not found" });
    }

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

    const record = await Address.findOne({
      where: {
        id: addressId,
      },
    });

    if (record) {
      const response = await Address.update(data, { where: { id: addressId } });

      if (response) {
        return res.status(200).send({ message: "Address Update !!", response });
      }
    } else {
      return res.status(404).send({ message: "No record found" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal Server Error" });
  }
};

//GET
const getAllAddress = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).send({ message: "user id not found" });
    }

    const record = await Address.findAndCountAll({
      where: {
        userId,
      },
    });

    if (record?.rows?.length >= 1) {
      return res.status(200).send({
        message: "Successfully GET",
        data: record?.rows,
        dataCount: record?.count,
      });
    } else {
      return res.status(404).send({ message: "No data found" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal Server Error" });
  }
};

// GET-SINGLE-ADDRESS

const getSingleAddress = async (req, res) => {
  try {
    const addressId = req.params.id;

    if (!addressId) {
      return res.status(400).send({ message: "Address is not found" });
    }

    const record = await Address.findOne({
      where: {
        id: addressId,
      },
    });

    if (record) {
      return res.status(200).send({ message: "Successfull get", data: record });
    } else {
      return res.status(404).send({ message: "No data found" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal server error!!!" });
  }
};

//DELETE
const deleteAddress = async (req, res) => {
  try {
    const addressId = req.params.id;

    const token = req.headers.authorization;
    const userData = jwt.decode(token);
    //validation
    if (!addressId) {
      return res.status(400).send({ message: "user id not found" });
    }

    const response = await Address.destroy({
      where: {
        id: addressId,
      },
    });

    if (response) {
      return res.status(200).send({ message: "Address deleted !!" });
    } else {
      return res.status(404).send({ message: "Something went wrong !!" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal server error" });
  }
};

module.exports = {
  addAddress,
  updateAddress,
  getAllAddress,
  getSingleAddress,
  deleteAddress,
};
