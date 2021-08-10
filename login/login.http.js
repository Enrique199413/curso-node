const { loginUser } = require("./login.controller");

const loginHttp = async (req, res) => {
  try {
    const token = await loginUser(req.body);
    if (token) {
      res.status(200).header("x-auth-token", token).json({ token: token });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { loginHttp };
