const router = require("express").Router();
const {
  getAllFavoritesHttp,
  addFavoriteHttp,
  getFavoriteHttp,
  updateFavoriteHttp,
  deleteFavoriteHttp,
} = require("../../controllers/favorites/favorites.http");

router.get("/", getAllFavoritesHttp);
router.post("/", addFavoriteHttp);
router.get("/:idUser", getFavoriteHttp);
router.put("/:idUser", updateFavoriteHttp);
router.delete("/:idUser", deleteFavoriteHttp);

module.exports.userFavorites = router;
