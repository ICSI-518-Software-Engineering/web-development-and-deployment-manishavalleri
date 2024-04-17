const jwt = require("jsonwebtoken");
// const config = require("config");
const jwtSecretKey = '8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb';
const getToken = (userId) => {
  console.log("secret key " + jwtSecretKey);
  let data = {
    time: Date(),
    userId: userId,
  };

  const token = jwt.sign(data, jwtSecretKey);
  return token;
};
module.exports = { getToken };
