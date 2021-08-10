const {
  addFavorites,
  getFavorites,
  getFavoritesUser,
  updateFavoritesUser,
  deleteFavoritesUser,
} = require("./favorites.controller");

const addFavoritesHttp = async (req, res) => {
  try {
    console.log("HTTP POST FAVORITES");
    const favorites = await addFavorites(req.body);
    res.status(202).json({
      message: "IdUser with favorite created",
      favorite: favorites.insertedId,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getFavoritesHttp = async (req, res) => {
  try {
    console.log("HTTP GET FAV");
    const allFavorites = await getFavorites();
    res.status(200).json(allFavorites);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getFavoritesUserHttp = async (req, res) => {
  const { idUser } = req.params;
  try {
    console.log("HTTP GET FAV FROM USER");
    const favoritesUser = await getFavoritesUser(idUser);
    favoritesUser.message
      ? res.status(202).json({ userId: idUser, message: favoritesUser.message })
      : res.status(200).json({ userId: idUser, favorites: favoritesUser });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const updateFavoritesUserHttp = async (req, res) => {
  const { idUser } = req.params;
  try {
    console.log("HTTP UPDATE FAV FROM USER");
    const favoritesUser = await updateFavoritesUser(idUser, req.body);
    res.status(200).json({
      favoriteId: favoritesUser._id,
      message: "IdUser favorites list updated",
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteFavoritesUserHttp = async (req, res) => {
  const { idUser } = req.params;
  try {
    console.log("HTTP DELETE FAV FROM USER");
    const favoritesUser = await deleteFavoritesUser(idUser);
    res.status(200).json({
      favoriteId: favoritesUser._id,
      message: "favorite list of userId deleted",
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  addFavoritesHttp,
  getFavoritesHttp,
  getFavoritesUserHttp,
  updateFavoritesUserHttp,
  deleteFavoritesUserHttp,
};
