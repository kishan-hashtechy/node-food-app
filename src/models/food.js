const { sequelize, DataTypes } = require("sequelize");
const sequelizeInstance = require("../libs/common/connect");

const Food = sequelizeInstance.define("Food", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING(40),
    allowNull: false,
    validate: { isAlpha: true },
  },

  price: {
    type: DataTypes.INTEGER(100),
    allowNull: false,
    validate: { isNumeric: true },
  },

  description: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: { min: 10, max: 200 },
  },

  bannerimage: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  category: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
    validate: { isNumeric: true },
  },

  type: {
    type: DataTypes.ENUM("Veg", "Non-veg"),
    allowNull: false,
  },

  ratings: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { isDecimal: true },
  },

  status: {
    type: DataTypes.ENUM("Active", "Inactive"),
    allowNull: false,
  },
});

module.exports = Food;
