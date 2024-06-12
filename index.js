const express = require("express");
const cors = require("cors");
const connect = require("./src/libs/common/connect");

if (process.env.NODE_EVN != "production") {
  require("dotenv").config();
}

const app = express();

app.use(cors());

connect();

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
