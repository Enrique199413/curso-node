//Maneja request y response, handler
const {addFavorite, updFavorite, delFavorite, getFavorites} = require('../favorites/favorites.controllers');
const {objectUtils} = require('../utils/utils');

//Adding favorites
const addFavsHttp = async (req, res) => {

    console.log('Within favorites.http-addFavs');
    let body = req.body;
    let favAdded = addFavorite(body);
    console.log('New favorite added successfuly...');
    favAdded.then(fav => {
        res.status(201)
        .json({
            message: `${fav.id} with favorite created` 
        })
    }).catch(err => {
        console.error('Error favorite exist...');
        console.error(err);
        res.status(400).json({
            message: err.message
        });
    });
}
//Updating Favorites
const updFavsHttp = async (req, res) => {
    console.log('Within favorites.http-updFavs');
    const favsArray = [req.query.favoriteId1,req.query.favoriteId2,req.query.favoriteId3];
    console.log(favsArray)
    let idUser = req.params.idUser;
    let favUpdated = updFavorite(idUser, favsArray);
    console.log('Favorite list updated successfuly...');
    favUpdated.then(fav => {
        res.status(200)
        .json({
            message: `${idUser} favorite list updated` 
        })
    }).catch(err => {
        console.error('Error favorite exist...');
        console.error(err);
        res.status(400).json(err);
    });
    
}
//
//Deleting Favorites
const delFavsHttp = async (req, res) => {
    console.log("From http object delete")
    const favsArray = [req.query.favoriteId1];
    console.log(favsArray)
    let idUser = req.params.idUser;
    let favDeleted = delFavorite(idUser, favsArray);
    favDeleted.then(fav => {
        res.status(200)
        .json({
            message: `Favorite list of ${idUser} deleted` 
        })
    }).catch(err => {
        console.error(err);
        res.status(400).json(err);
    });
}
//
//Getting favorites
const getAllFavsHttp = (req, res) => {
    console.log('Within favorites.http-getAllFavs');
    let idUser = req.params.idUser;
    const allFavorites = getFavorites(idUser);
    console.log('Favorites retrieved successfuly...');
    allFavorites.then(favs => {
        res.status(200).json(favs);
    }).catch(error => {
        res.status(400).json(error);
    })
    
}

module.exports = {
    addFavsHttp,
    updFavsHttp,
    delFavsHttp,
    getAllFavsHttp
}