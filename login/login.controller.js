const jwt = require("jsonwebtoken");

const loginWithUserAndPass = (username, password) => {
  const token = jwt.sign({ username, password }, "nodeJSSecret");
  return token;
};

module.exports = { loginWithUserAndPass };
