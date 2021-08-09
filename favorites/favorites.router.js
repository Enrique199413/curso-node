const router = require('express').Router()
const { addFavoriteHttp, getFavoriteHttp, getAllFavoritesHttp, updateFavoriteHttp, deleteFavoriteHttp } = require('./favorites.http')

router.post('/', addFavoriteHttp)
router.get('/', getAllFavoritesHttp)
router.get('/:idUser', getFavoriteHttp)
router.put('/:idUser', updateFavoriteHttp)
router.delete('/:idUser', deleteFavoriteHttp)

module.exports.favoritesRouter = router