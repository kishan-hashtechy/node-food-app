const Address = require("../models/address");
const User = require("../models/user");

const AddAddress = async (req, res) => {
  try {
    console.log("adfdasf");
    res.end("success");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { AddAddress };
