const router = require('express').Router()
const {objectUtils} = require('../utils/general.utils')
const {
    getAllFavoritesHttp,
    getFavoritesByUserIdHttp,
    addFavoritesHttp,
    updateFavoritesHttp,
    deleteFavoritesHttp
} = require('./favorites.http')

router.post('/',(req, res, next) => {
    const {message: messageValidObjectStructure,
        canContinue: isValidBody
    } = objectUtils.existPropertiesOnObject(req.body, 'userId', 'spaceId')
    if (!isValidBody) {
        res.status(400).json({message: messageValidObjectStructure})
        return
    }

    const {message: messageValidValuesOnKeys,
        canContinue: isValidValuesOnBody
    } = objectUtils.allKeysWithValidData(req.body)

    if (!isValidValuesOnBody) {
        res.status(400).json({message: messageValidValuesOnKeys})
        return
    }
    next()

    }, addFavoritesHttp)

router.put('/:idUser', updateFavoritesHttp)

router.delete('/:idUser', deleteFavoritesHttp)

router.get('/:idUser',  getFavoritesByUserIdHttp)

router.get('/', getAllFavoritesHttp)
module.exports.favoritesRouter = router