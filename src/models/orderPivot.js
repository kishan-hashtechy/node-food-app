const { DataTypes } = require("sequelize");
const sequelizeInstance = require("../libs/common/connect");
const Food = require("../models/food");

const orderPivot = sequelizeInstance.define("Order_pivot", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    notEmpty: true,
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
  },
});

orderPivot.hasMany(Food, { foreignKey: "foodId", as: "food" });

module.exports = orderPivot;
