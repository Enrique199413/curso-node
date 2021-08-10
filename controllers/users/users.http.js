const {
  addUser,
  getAllUsers,
  getUsersByParams,
  findAndDeleteUser,
  findAndUpdateUser,
} = require("./users.controllers");

const addUserHttp = async (req, res) => {
  try {
    const idFromUser = await addUser(req.body);
    return res.status(201).json({ _id: idFromUser });
  } catch (e) {
    console.error(e);
    return res.status(400).json(e);
  }
};

const getAllUsersHttp = (req, res) => {
  getAllUsers()
    .then((resp) => {
      res.status(200).send(resp);
    })
    .catch((err) => {
      res.status(400).send({ err });
    });
};

const getByParams = (req, res) => {
  getUsersByParams(req.params)
    .then((resp) => {
      res.status(200).send(resp);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const deleteUser = (req, res) => {
  findAndDeleteUser(req.params)
    .then((resp) => {
      res.status(200).send(resp);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const updateUser = (req, res) => {
  console.log(req.body);
  findAndUpdateUser(req.params, req.body)
    .then((resp) => {
      res.status(200).send(resp);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = {
  addUserHttp,
  getAllUsersHttp,
  getByParams,
  deleteUser,
  updateUser,
};
