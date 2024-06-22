const { sequelize, DataTypes } = require("sequelize");
const sequelizeInstance = require("../libs/common/connect");

const Order = sequelizeInstance.define("Food", {
  id: {
    type: DataTypes.INTEGER(10),
    autoIncrement: true,
    primaryKey: true,
  },

  items: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: { isAlpha: true },
  },

  no_of_items: {
    type: DataTypes.INTEGER(20),
    allowNull: false,
    validate: { isNumeric: true },
  },

  delivery_status: {
    type: DataTypes.ENUM(
      "Ready for delivery",
      "Delevered",
      "Rejected",
      "On the way "
    ),
    allowNull: false,
  },

  total_price: {
    type: DataTypes.INTEGER(100),
    allowNull: false,
    validate: { isNumeric: true },
  },

  coupon_id: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },

  payment_status: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: { isAlpha: true },
  },
});
