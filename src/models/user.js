const { sequelize, DataTypes } = require("sequelize");
const sequelizeInstance = require("../libs/common/connect");
const Address = require("../models/address");

const User = sequelizeInstance.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    fullName: {
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
      type: DataTypes.STRING(300),
      allowNull: false,
      validate: { max: 300, min: 5 },
    },

    mobileNumber: {
      type: DataTypes.STRING(10),
      validate: {
        is: /^[6-9]\d{0,9}$/,
      },
    },

    userProfile: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "/profile_img/1719403974239-profileIcon.svg",
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

    userStatus: {
      type: DataTypes.ENUM("Active", "Inactive"),
      allowNull: true,
    },
  },
  {
    paranoid: true,
    deletedAt: "deletedAt",
  }
);

// Here pelase check proper relationships working or not...
User.hasMany(Address, { foreignKey: "userId" });

// User.hasMany(Address, {
//   foreignKey: "userId"
// });

module.exports = User;
