const { DataTypes } = require("sequelize");
const sequelizeInstance = require("../libs/common/connect");
const Food = require("./food");

const orderPivot = sequelizeInstance.define("cart", {
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
  },

  cart_code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    notEmpty: true,
  },

  total_price:{
    type:DataTypes.INTEGER,
    allowNull: false,
    notEmpty: true
  }
});

orderPivot.hasMany(Food, { foreignKey: "foodId", as: "food" });

module.exports = orderPivot;
