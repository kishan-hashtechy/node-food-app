const { sequelize, DataTypes } = require("sequelize");
const sequelizeInstance = require("../libs/common/connect");
const User = require("../models/user");

const Order = sequelizeInstance.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      refrence: {
        model: "User",
        key: "id",
      },
    },

    order_status: {
      type: DataTypes.ENUM("order-ready", "out-for-delivery", "delivered"),
      allowNull: false,
      defaultValue: "order-ready",
    },

    cart_code: {
      type: DataTypes.STRING,
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

    total_quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    payment_method: {
      type: DataTypes.ENUM("Cash", "Card"),
      allowNull: false,
      defaultValue: "Cash",
    },
  },
  {
    paranoid: true,
    deletedAt: "deletedAt",
  }
);

//Order.belongsTo(User, { foreignKey: "userId"});

module.exports = Order;
