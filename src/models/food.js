const { DataTypes } = require("sequelize");
const sequelizeInstance = require("../libs/common/connect");
const Cart = require("./cart");

const Food = sequelizeInstance.define(
  "Food",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },

    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { isNumeric: true },
    },

    description: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: { min: 10, max: 200 },
    },

    foodImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    category: {
      type: DataTypes.ENUM("Foods", "Drinks", "Snacks", "Sauce"),
      allowNull: false,
      defaultValue: "Foods",
    },

    type: {
      type: DataTypes.ENUM("Veg", "Non-veg"),
      allowNull: false,
    },

    ratings: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { isDecimal: true },
    },

  status: {
    type: DataTypes.ENUM("Active", "Inactive"),
    allowNull: false,
    defaultValue: "Active",
  },
},{
  paranoid: true,
  deletedAt: 'deletedAt',
  defaultScope:{
    where:{
      status: "Active",
    },
  }
});

// Food.hasMany(Cart, {foreignKey: 'foodId', sourceKey:'food'});

module.exports = Food;
