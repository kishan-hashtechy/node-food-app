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
    allowNull: false,
  },

  pincode: {
    type: DataTypes.STRING(6),
    allowNull: false,
    validate: { max: 6 },
  },

  type: {
    type: DataTypes.ENUM("Home", "Work"),
    allowNull: false,
  },

  city: {
    type: DataTypes.STRING(20),
    allowNull: false,
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
