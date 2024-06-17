const { DataTypes } = require("sequelize");
const sequelizeInstance = require("../libs/common/connect");
const Address = require("../models/address");

const User = sequelizeInstance.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  fullName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },

  password: {
    type: DataTypes.STRING(30),
    allowNull: false,
    validate: {
      min: 6,
      max: 30,
    },

    mobileNumber: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        is: /^[6-9]\d{0,9}$/,
        len: [0, 9],
      },
    },

    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: false,
    },

    userStatus: {
      type: DataTypes.ENUM("Active", "Inactive"),
      allowNull: false,
    },
  },
});

// User.hasMany(Address, { foreignKey: "userId" });
module.exports = User;
