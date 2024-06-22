const { Sequelize } = require("sequelize");

const sequelizeInstance = new Sequelize({
  dialect: "postgres",
  database: "postgres",
  username: "postgres",
  password: "admin",
  host: "localhost",
  port: 5432,
  logging: false,
});

module.exports = sequelizeInstance;
