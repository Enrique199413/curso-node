const { getAllUsers } = require("./users.controllers");

const getAllUsersHttp = (req, res) => {
  getAllUsers()
    .then((resp) => {
      res.status(200).send(resp);
    })
    .catch((err) => {
      res.status(400).send({ err });
    });
};

module.exports = {
  getAllUsersHttp,
};
