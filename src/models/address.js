const { sequelize, DataTypes } = require("sequelize");
const sequelizeInstance = require("../libs/common/connect");
const User = require("../models/user");

const Address = sequelizeInstance.define("Address", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  addressLine1: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  addressLine2: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },

  pincode: {
    type: DataTypes.STRING(6),
    allowNull: false,
    // validate: { max: 6 },
  },

  type: {
    type: DataTypes.ENUM("Home", "Work"),
    allowNull: true,
    defaultValue: "Home",
  },

  city: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },

  reciverName: {
    type: DataTypes.STRING(40),
    allowNull: true,
  },

  reciverNumber: {
    type: DataTypes.STRING(10),
    allowNull: true,
    validate: {
      is: /^[6-9]\d{0,9}$/,
    },
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    refrence: {
      model: "User",
      key: "id",
    },
  },
});

// User.hasMany(Address, { foreignKey: "userId" });

module.exports = Address;
