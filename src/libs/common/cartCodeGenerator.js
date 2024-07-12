const cartCodeGenerator = () => {
  const length = 7;
  const character =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";
  for (let i = 0; i < length; i++) {
    result += character.charAt(Math.floor(Math.random() * character?.length));
  }
  console.log("code ==>", result);
  return result;
};

module.exports = { cartCodeGenerator };
