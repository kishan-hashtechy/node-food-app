const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    if (token) {
      let user = jwt.verify(token, SECRET_KEY);
      req.userId = user.id;
    } else {
      res.status(401).json({ message: "Please add token..." });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized User" });
  }
};

module.exports = auth;
