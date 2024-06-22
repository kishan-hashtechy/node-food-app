const { sequelize, DataTypes } = require("sequelize");
const sequelizeInstance = require("../libs/common/connect");
const Food = require("../models/food");

const orderPivot = sequelizeInstance.define("Order_pivot", {
  id: {
    type: DataTypes.INTEGER(10),
    autoIncrement: true,
    primaryKey: true,
  },

  order_id: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
  },

  user_id: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
  },

  food_id: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
  },

  no_of_item: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
    validate: { isNumeric: true },
  },
});

orderPivot.hasMany(Food, { foreignKey: "foodId", as: "food" });

module.exports = orderPivot;
