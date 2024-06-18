const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    return error;
  }
};

const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};

module.exports = {
  hashPassword,
  comparePassword,
};
