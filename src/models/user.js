const { sequelize, DataTypes } = require("sequelize");
const sequelizeInstance = require("../libs/common/connect");
const Address = require("../models/address");

const User = sequelizeInstance.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  fullname: {
    type: DataTypes.STRING(40),
    allowNull: false,
    validate: { max: 40 },
  },

  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: { isEmail: true, max: 50 },
  },

  password: {
    type: DataTypes.STRING(30),
    allowNull: false,
    validate: { max: 30, min: 5 },
  },

  mobileno: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      is: /^[6-9]\d{0,9}$/,
    },
  },

  profileimage: {
    type: DataTypes.STRING,
    // allow null true
    allowNull: true,
  },

  gender: {
    type: DataTypes.ENUM("Female", "Male", "Other"),
    allowNull: true,
  },

  dob: {
    type: DataTypes.DATE,
    allowNull: true,
    validate: { isDate: true },
  },

  userstatus: {
    type: DataTypes.ENUM("Active", "Inactive"),
    allowNull: true,
  },
});

Address.belongsTo(User, { foreignKey: "userId" });

module.exports = User;
