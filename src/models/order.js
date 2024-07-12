const { sequelize, DataTypes } = require("sequelize");
const sequelizeInstance = require("../libs/common/connect");
const User = require("../models/user");

const Order = sequelizeInstance.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  userId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    refrence: {
      model: "User",
      key: "id",
    }, 
  },

  order_status: {
    type: DataTypes.ENUM(
      "ready-for-delivery",
      "Delivered",
      "On-the-way "
    ),
    allowNull: false,
  },

  cart_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  total_price: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  payment_method: {
    type: DataTypes.ENUM('Cash', 'Card'),
    allowNull: false,
  },
},{
  paranoid: true,
  deletedAt: 'deletedAt',
},
);

//Order.belongsTo(User, { foreignKey: "userId"});

module.exports = Order;
