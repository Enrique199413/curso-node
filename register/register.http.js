const { registerUser } = require("./register.controller");

const registerHttp = async (req, res) => {
  try {
    console.log("HTTP");
    const user = await registerUser(req.body);
    console.log("USER HTTP" + JSON.stringify(user));
    if (user) {
      res.status(202).json({ userId: user.insertedId });
    }
  } catch (error) {
    res.status(400).json({ meessage: error });
  }
};

module.exports = registerHttp;
