const { getAllFavorites } = require("./favorites.controller");

const getAllFavoritesHttp = (req, res) => {
  getAllFavorites()
    .then((resp) => {
      res.status(200).send(resp);
    })
    .catch((err) => {
      res.status(400).send({ err });
    });
};

const addFavoriteHttp = async (req, res) => {
  try {
    await addFavorite(req.body);
    res.status(202).json({
      code: 202,
      message: "favorite created",
    });
  } catch (e) {
    res.status(400).json({
      message: "User already favorite",
    });
  }
};

const getFavoriteHttp = async (req, res) => {
  try {
    const getFavoriteList = await getFavorite(req.params.idUser);
    res.status(200).json({ favorite: getFavoriteList.favoriteArr });
  } catch (e) {
    res.status(400).json(e);
  }
};

const updateFavoriteHttp = async (req, res) => {
  try {
    await updateFavorite(req.params.idUser, req.body);
    res.status(200).json({ message: "Favorite updated" });
  } catch (e) {
    res.status(400).json({ message: "Error" });
  }
};

const deleteFavoriteHttp = async (req, res) => {
  try {
    await deleteFavorite(req.params.idUser, req.body.favoriteArr);
    res.status(200).json({ message: "favorite  deleted" });
  } catch (e) {
    res.status(400).json({
      message: "Error to delete favorite",
    });
  }
};

module.exports = {
  getAllFavoritesHttp,
  addFavoriteHttp,
  getFavoriteHttp,
  updateFavoriteHttp,
  deleteFavoriteHttp,
};
