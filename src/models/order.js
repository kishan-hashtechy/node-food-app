const { sequelize, DataTypes } = require("sequelize");
const sequelizeInstance = require("../libs/common/connect");
const User = require("../models/user");

const Order = sequelizeInstance.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    notEmpty: true,
  },

  delivery_status: {
    type: DataTypes.ENUM(
      "Ready-for-delivery",
      "Delivered",
      "Rejected",
      "On-the-way "
    ),
    allowNull: false,
  },

  total_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { isNumeric: true },
  },

  cart_code: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },

  payment_status: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: { isAlpha: true },
  },
});

// Order.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = Order;
