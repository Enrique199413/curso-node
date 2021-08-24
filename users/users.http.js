const { getUsers } = require("./users.controller");

const getUsersHttp = async (req, res) => {
  try {
    console.log("HTTP LÇOGIN USUAIROS");
    const allUsers = await getUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { getUsersHttp };
