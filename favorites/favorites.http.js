const { addFavorite, getFavorite, getAllFavorites, updateFavorite, deleteFavorite } = require('./favorites.controller')

const addFavoriteHttp = async(req, res) => {
    console.log(req, 'REEEEQ')
    try {
        await addFavorite(req.body)
        res.status(202).json({
            code: 202,
            message: "IdUser with favorite created"
        })
    } catch (e) {
        res.status(400).json({ message: "The user already set this favorite, please add another" })
    }
}

const getFavoriteHttp = async(req, res) => {
    console.log(req)
    try {
        const getFavoriteList = await getFavorite(req.params.idUser)
        res.status(200).json({ favorite: getFavoriteList.favoriteArr })
    } catch (e) {
        res.status(400).json(e)
    }
}

const updateFavoriteHttp = async(req, res) => {
    console.log(req, 'UPDAAATTTE')
    try {
        await updateFavorite(req.params.idUser, req.body)
        res.status(200).json({ message: "IdUser favorites list updated" })
    } catch (e) {
        console.error(e)
        res.status(400).json({ message: "Error" })
    }
}

const deleteFavoriteHttp = async(req, res) => {
    try {
        await deleteFavorite(req.params.idUser, req.body.favoriteArr)
        res.status(200).json({ message: "favorite list of userId deleted" })
    } catch (e) {
        console.error(e)
        res.status(400).json({ message: "IdUser hasn't get favorites list, please add first and then try deleted" })
    }
}

const getAllFavoritesHttp = async(req, res) => {
    try {
        const allFav = await getAllFavorites(req.body)
        res.status(200).json({ code: 200, dataFav: { allFav } })
    } catch (e) {
        res.status(400).json({ message: 'Error' })
    }
}


module.exports = { addFavoriteHttp, getFavoriteHttp, getAllFavoritesHttp, updateFavoriteHttp, deleteFavoriteHttp }