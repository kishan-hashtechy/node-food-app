const { Sequelize } = require("sequelize");

export const sequelizeInstance = new Sequelize(
  `pg://${process.env.NAME}:${process.env.PASSWORD}@${process.env.ENDPOINT}:5432/${process.env.DB_NAME}`
);
