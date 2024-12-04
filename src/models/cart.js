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

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
    },

    food_id: {
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
      where: {
        cartStatus: "pending",
      },
    }
  }
);

Cart.belongsTo(Food, { foreignKey: "food_id", targetKey: "id" });

module.exports = Cart;
