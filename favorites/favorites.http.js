const { addFavorites, getAllFavorites, updateFavorites, deleteFavorites } = require('./favorites.controller')
const { readAllSpaces } = require('../spaces/spaces.controller')

const addFavoritesHttp = async (req, res) => {
    try {
        const idFromUser = await addFavorites(req.body)
        res.status(201).json({
            userId: idFromUser
        })
    } catch (e) {
        console.error(e)
        res.status(400).json(e)
    }
}

const getAllFavoritesHttp = async(req, res) => {

    try {
        const allFavorites = await getAllFavorites(req.params.idUser)
        res.status(200).json(allFavorites)
    } catch (e) {
        res.status(400).json(e)
    }
}

const updateFavoritesHttp = async(req, res) => {

    try {
        const allSpaces = await readAllSpaces()
        if (req.body.length < 1) {
            res.status(400).json(
                {
                    "message": "List is empty if you delete list of favorites please use DELETE method"
                } 
            )
        } else {
            const updatedFavorites = await updateFavorites(req.params.idUser, req.body, allSpaces)
            res.status(200).json(updatedFavorites)
        }
        
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
}


const deleteFavoritesHttp = async(req, res) => {

    try {
        const deletedFavorites = await deleteFavorites(req.params.idUser)
        res.status(200).json(deletedFavorites)
    } catch (e) {
        res.status(400).json(e)
    }
}

module.exports = {
    addFavoritesHttp,
    getAllFavoritesHttp,
    updateFavoritesHttp,
    deleteFavoritesHttp
}