const router = require('express').Router()
const { addFavoritesHttp, deleteFavoritesHttp, getFavoritesHttp, getAllFavoritesHttp, updateFavoritesHttp } = require('./favorites.http')

router.get('/', getAllFavoritesHttp)
router.get('/:userId', getFavoritesHttp)
router.post('/', addFavoritesHttp)
router.delete('/:userId', deleteFavoritesHttp)
router.put('/:userId', updateFavoritesHttp)

module.exports.favoritesRouter = router