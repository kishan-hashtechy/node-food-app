const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const sequelizeInstance = require("./src/libs/common/connect");
const User = require("./src/models/user")
const Address = require("./src/models/address");
const { Sequelize } = require("sequelize");

if (process.env.NODE_EVN != "production") {
  require("dotenv").config();
}

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/users", require("./src/routes/users"));
app.use("/api/address", require("./src/routes/address"));
app.use("/product", require("./src/routes/product"));

const initApp = async () => {
  try{
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    });

    // Associations
    // User.hasMany(Address,  { foreignKey: "userId" })
    // Address.belongsTo(User, { foreignKey: "userId" })    

    sequelizeInstance.sync({ force: false })
  } catch(error){
    console.error("Failed to connect to DB", error);
  }
}

initApp()

app.get("/", (req, res) => {
  res.status(200).send({ code: 200, message: "success" });
});

// try {
//   sequelizeInstance.authenticate();
//   sequelizeInstance.sync({ force: false });
//   console.log("Connected to DB");
// } catch (error) {
//   console.error("Failed to connect DB", error);
// }
