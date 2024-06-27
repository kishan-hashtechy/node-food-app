const { sequelize, DataTypes } = require("sequelize");
const sequelizeInstance = require("../libs/common/connect");
const User = require("../models/user");

const Order = sequelizeInstance.define("Order", {
  id: {
    type: DataTypes.INTEGER(10),
    autoIncrement: true,
    primaryKey: true,
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
    type: DataTypes.INTEGER(100),
    allowNull: false,
    validate: { isNumeric: true },
  },

  coupon_id: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },

  payment_status: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: { isAlpha: true },
  },
});

Order.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = Order;
