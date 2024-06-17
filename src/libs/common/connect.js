const { Sequelize } = require("sequelize");

const sequelizeInstance = new Sequelize({
  dialect: "postgres",
  database: "food-app",
  username: "postgres",
  password: "password",
  host: "localhost",
  port: 5432,
  logging: false,
});

module.exports = sequelizeInstance;
