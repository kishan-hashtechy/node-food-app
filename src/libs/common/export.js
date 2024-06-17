const { Sequelize } = require("sequelize");

const sequelizeInstance = new Sequelize(
  `postgres://${process.env.NAME}:${process.env.PASSWORD}@${process.env.ENDPOINT}:5432/${process.env.DB_NAME}`
);

module.exports = { sequelizeInstance };
