const { DataTypes } = require("sequelize");
const User = require("../models/user");
const sequelizeInstance = require("../libs/common/connect");

const Address = sequelizeInstance.define("Address", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  addressLine1: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  addressLine2: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  type: {
    type: DataTypes.ENUM("Home", "Work"),
    allowNull: false,
  },

  pinCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      max: 6,
    },
  },

  city: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },

  // userId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: "User",
  //     key: "id",
  //   },
  // },
});

// Address.belongsTo(User, { foreignKey: "userId" });
module.exports = Address;
