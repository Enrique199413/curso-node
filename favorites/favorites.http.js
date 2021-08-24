const {addFavorites, deleteFavorites, getFavorites, getAllFavorites, updateFavorites} = require('./favorites.controller')
const { objectUtils } = require('../utils/utils')

const addFavoritesHttp = async(req, res) => {
    const {
        message,
        canContinue: isValidBody
    } = objectUtils.existPropertiesOnObject(req.body, 'userId', 'spaceId')

    if(!isValidBody){
        res.status(400).json({message})
    }

    try {
        const favorites = await addFavorites(req.body)
        res.status(202).json(favorites)
    } catch (error) {
        res.status(400).json(error)
    }
}

const deleteFavoritesHttp = async(req, res) => {
    const {
        message,
        canContinue: isValidBody
    } = objectUtils.existPropertiesOnObject(req.params, 'userId')

    if(!isValidBody){
        res.status(400).json({message})
    }

    try {
        const favorites = await deleteFavorites(req.params)
        res.status(200).json(favorites)
    } catch (error) {
        res.status(400).json(error)
    }
}

const _deleteFavoritesHttp = async(req, res) => {
    const {
        message,
        canContinue: isValidBody
    } = objectUtils.existPropertiesOnObject({...req.params, ...req.body}, 'userId', 'spaceId')

    if(!isValidBody){
        res.status(400).json({message})
    }

    try {
        const favorites = await deleteFavorites({...req.params, ...req.body})
        res.status(201).json(favorites)
    } catch (error) {
        res.status(400).json(error)
    }
}

const getFavoritesHttp = (req, res) => {
    getFavorites(req.params.userId).then(resultados => {
        res.status(200).json(resultados)
    }).catch(error => {
        res.status(400).json(error)
    })
}

const getAllFavoritesHttp = (req, res) => {
    getAllFavorites(req.query).then(resultados => {
        res.status(200).json(resultados)
    }).catch(error => {
        res.status(400).json(error)
    })
}

const updateFavoritesHttp = (req, res) => {
    const {
        message,
        canContinue: isValidBody
    } = objectUtils.existPropertiesOnObject({...req.params, ...req.body}, 'userId', 'favorites')

    if(!isValidBody){
        res.status(400).json({message})
    }

    updateFavorites({...req.params, ...req.body}).then(resultados => {
        res.status(200).json(resultados)
    }).catch(error => {
        res.status(400).json(error)
    })
}

module.exports = { addFavoritesHttp, deleteFavoritesHttp, getFavoritesHttp, getAllFavoritesHttp, updateFavoritesHttp }