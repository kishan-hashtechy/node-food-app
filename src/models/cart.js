const { DataTypes } = require("sequelize");
const sequelizeInstance = require("../libs/common/connect");
const Food = require("./food");
const User = require("./user");

const Cart = sequelizeInstance.define(
  "Cart",
  {
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

    foodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    no_of_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { isNumeric: true },
      defaultValue: 1,
    },

    cart_code: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
    },

    cartStatus: {
      type: DataTypes.ENUM("pending", "confirmed", "removed"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    paranoid: true,
    deletedAt: "deletedAt",
    defaultScope: {
      cartStatus: "pending",
    },
  }
);

Cart.belongsTo(Food, { foreignKey: "foodId", targetKey: "id" });

module.exports = Cart;
