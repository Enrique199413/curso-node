
const {
    getAllFavorites,
    getByUserIdFavorites,
    addFavorites,
    updateFavorites,
    deleteFavorites
} = require('./favorites.controller')

const getAllFavoritesHttp = async (req, res) => {
    try {
        const allFavorites = await getAllFavorites()
        res.status(200).json(allFavorites)
    }catch (e) {
        res.status(400).json(e)
    }
}

const getFavoritesByUserIdHttp = async (req, res) => {
    const {params: {idUser}} = req
    try {
        const favoritesByUserId = await getByUserIdFavorites(idUser)
        if (favoritesByUserId === null) {

            return res.status(200).json({message:'IdUser hasn\'t favorites please add one and try again'})

        }
        res.status(200).json(favoritesByUserId.favorites)
    }catch (e) {
        res.status(400).json(e)
    }
}

const addFavoritesHttp = async (req, res) => {
    try {
        const newFavorites = await addFavorites(req.body)

        res.status(200).json(newFavorites)
    }catch (e) {
        console.log('http', e)
        res.status(400).json(e)
    }
}

const updateFavoritesHttp = async (req, res) => {
    const {params: {idUser}} = req
    try {
        if (req.body.length === 0) {
            res.status(200).json({message: 'List is empty if you delete list of favorites please use DELETE method'})
        } else {
            const newFavorites = await updateFavorites(idUser, req.body)
            res.status(200).json(newFavorites)
        }
    }catch (e) {
        res.status(400).json(e)
    }
}

const deleteFavoritesHttp = async (req, res) => {
    const {params: {idUser}} = req
    try {
        const deleteFav = await deleteFavorites(idUser, req.body)
        res.status(200).json(deleteFav)

    }catch (e) {
        res.status(400).json(e)
    }
}


module.exports = {
    getAllFavoritesHttp,
    getFavoritesByUserIdHttp,
    addFavoritesHttp,
    updateFavoritesHttp,
    deleteFavoritesHttp
}