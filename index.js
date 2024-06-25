const express = require("express");
const cors = require("cors");
var bodyParser = require('body-parser')
const sequelizeInstance = require("./src/libs/common/connect");

if (process.env.NODE_EVN != "production") {
  require("dotenv").config();
}

const app = express();

app.use(express.json());
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/users", require("./src/routes/users"));
app.use("/api/address", require("./src/routes/address"));
app.use("/admin/", require("./src/routes/admin"));

try {
  sequelizeInstance.authenticate();
  sequelizeInstance.sync({ force: false });
  console.log("Connected to DB");
} catch (error) {
  console.error("Failed to connect DB", error);
}

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
