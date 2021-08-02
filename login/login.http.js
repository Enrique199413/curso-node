const loginController = require("./login.controller");

const loginHttp = async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const token = await loginController.loginWithUserAndPass(
      username,
      password
    );
    res.status(201).json(token);
  } else {
    res.status(400).json("Ingresa usuario y contraseña");
  }
};

module.exports = loginHttp;
