const router = require('express').Router()

const { addFavoritesHttp, getAllFavoritesHttp, updateFavoritesHttp, deleteFavoritesHttp } = require('./favorites.http')


//create
router.post('/', addFavoritesHttp)

//getAll
router.get('/:idUser', getAllFavoritesHttp)

//upDate
router.put('/:idUser', updateFavoritesHttp)

//Delete
router.delete('/:idUser', deleteFavoritesHttp)

module.exports.favoritesRouter = router