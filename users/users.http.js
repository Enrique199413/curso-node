const {
  addUser,
  getAllUsers,
  findUser,
  updateUser,
  deleteUser,
  _addUser,
} = require("./users.controller");

const addUserHttp = async (req, res) => {
  try {
    const idUser = await addUser(req.body);
    res.status(201).json({
      id: idUser,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAllUsersHttp = async (req, res) => {
  if (Object.keys(req.params).length !== 0) {
    console.log("BUSQUEDA");
    try {
      const userToFind = await findUser(req.params);
      res.status(200).json({ count: 0, users: userToFind });
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    try {
      const allUsers = await getAllUsers();
      res.status(200).json(allUsers);
    } catch (error) {
      res.status(400).json(error);
    }
  }
};

const updateUserHttp = async (req, res) => {
  const { id } = req.params;
  try {
    const lastUser = await updateUser(id, req.body);
    console.log("LASTUSEER" + lastUser);
    res.status(201).json({
      lastUser,
      NewUser: req.body,
    });
  } catch (e) {
    res.status(400).json(error);
  }
};

const deleteUserHttp = async (req, res) => {
  const { id } = req.params;

  try {
    const userDeleted = await deleteUser(id);
    res.status(200).json({
      userDeleted: {
        id,
      },
    });
  } catch (e) {
    res.status(400).json(e);
  }
};

module.exports = {
  addUserHttp,
  getAllUsersHttp,
  updateUserHttp,
  deleteUserHttp,
};
