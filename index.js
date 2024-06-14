const express = require("express");
const cors = require("cors");
const sequelizeInstance = require("./src/libs/common/connect");
const { hashPassword } = require("./src/libs/helpers/passwordHasher");
const User = require("./src/models/user");
const { Op } = require("sequelize");

if (process.env.NODE_EVN != "production") {
  require("dotenv").config();
}

const app = express();

app.use(express.json());

app.use(cors());

// connect();

app.use("/api/users", require("./src/routes/users"));
app.use("/api/address", require("./src/routes/address"));

try {
  sequelizeInstance.authenticate();
  sequelizeInstance.sync({ force: true });
  console.log("Connected to DB");
} catch (error) {
  console.error("Failed to connect DB", error);
}

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
