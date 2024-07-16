const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

const auth = (req, res, next) => {
  try {
    let token = req?.headers?.authorization?.split(" ")[1];

    if (token) {
      let user = jwt.verify(token, SECRET_KEY);
      req.userId = user?.user?.id;
    } else {
      return res.status(401).send({ message: "Please add token..." });
    }
    next();
  } catch (error) {
    return res.status(401).send({ message: error.message || "Unauthorized User" });
  }
};

module.exports = auth;
