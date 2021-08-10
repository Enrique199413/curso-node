const router = require("express").Router();
const {
  addFavoritesHttp,
  getFavoritesHttp,
  getFavoritesUserHttp,
  updateFavoritesUserHttp,
  deleteFavoritesUserHttp,
} = require("./favorites.http");
const { objectUtils } = require("../utils/validators.utils");

router.post(
  "/",
  async (req, res, next) => {
    const { message: validObjectStructure, canContinue: isValidBody } =
      objectUtils.existPropertiesOnObject(req.body, "userId", "spaceId");
    if (!isValidBody) {
      res.status(400).json({ message: validObjectStructure });
      return;
    }
    next();
  },
  addFavoritesHttp
);

router.get("/allFavorites", getFavoritesHttp);

router.get("/:idUser", getFavoritesUserHttp);

router.put("/:idUser", updateFavoritesUserHttp);

router.delete("/:idUser", deleteFavoritesUserHttp);

module.exports.favoritesRouter = router;
