const Favorite = require('../models/favorite_model');
const Space = require('../models/space_model');


const addFavorite = async (body) => {
    
    try {
        let validUserId = body.userId;
        let newFavorite = body.spaceId;
        let arrayFavs = [];
        let existFav = await Favorite.findOne({userId: validUserId}).exec();
        
        if(!existFav) {
            let favorite = new Favorite({
                userId: validUserId,
                favorites: [newFavorite]
            });
            return await favorite.save();
        } else {
            console.log(`${validUserId} exists...`);
            console.log(existFav);
            let exist = false;
            arrayFavs = existFav.favorites;
            for(let i=0; i<arrayFavs.length; i++) {
                if(arrayFavs[i] === newFavorite){
                    exist = true;
                    break;
                }
            }
            if(exist){
                return Promise.reject({
                    message: 'The user already set this favorite, please add another',
                    userExistWithId: newFavorite
                })       
            } else {
                arrayFavs.push(newFavorite);
                let favorite = await Favorite.findOneAndUpdate({userId: validUserId}, {
                    $set: {
                        favorites: arrayFavs
                    }
                }, {new: true});
                return favorite;
            }
        }

    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    }
}

//Updating
const updFavorite = async (id,args) => {
    console.log('Within favorites controller');
    
    try {
        let idUser = id;
        let existFavs = await Favorite.findOne({userId: idUser}).exec();
        const validSpaces = await Space.find();
        console.log('valid spaces');
        console.log(validSpaces);
        if(!existFavs) {
            return Promise.reject({
                message: 'The user does not exist'
            })
        } else {
            console.log(`${idUser} exists...`);
            console.log(existFavs);
            if(existFavs.favorites.length === 0 || args.length === 0){
                return Promise.reject({
                    message: `${idUser} does not have a favorites list, please add one first and try to update`
                })       
            } else {
                
                let favorite = await Favorite.findOneAndUpdate({userId: idUser}, {
                    $set: {
                        favorites: args
                    }
                }, {new: true});
                return favorite;
            }
        }

    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    }
}
//Endign update

//Deleting
const delFavorite = async (id, favList) => {
    
    try {
        let idUser = id;
        let arrayFavs = [];
        let favsToDel = [];
        let existFavs = await Favorite.findOne({userId: idUser}).exec();
        
        if(!existFavs) {
            return Promise.reject({
                message: 'The user does not exist'
            })
        } else {
            console.log(`${idUser} exists...`);
            console.log(existFavs);
            arrayFavs = existFavs.favorites;
            if(arrayFavs.length === 0 || favList.length === 0){
                return Promise.reject({
                    message: `${idUser} does not have a favorites list, please add one and then try to delete`
                })       
            } else {
                favList.forEach(favToDel => {
                    arrayFavs.forEach(favToCompare => {
                        if(favToDel===favToCompare)
                            favsToDel.push(favToDel);
                    })
                })
                let favorite = await Favorite.findOneAndUpdate({userId: idUser}, {
                    $set: {
                        favorites: favsToDel
                    }
                }, {new: true});
                return favorite;
            }
        }

    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    }
}
//Endign delete
const getFavorites = async (idUser) => {
    
    console.log('Within favorites controller-getFavorites')
    console.log(idUser);
    let arrayFavs = [];
    try {
        let favorite = await Favorite.findOne({userId: idUser}, "favorites").exec();
        arrayFavs = favorite.favorites;
        if(arrayFavs.length<=0) {
            return Promise.reject({
                message: `${idUser} dose not have favorites yet, please add one and try again`
            });
        }
        //console.log(favorites);
        console.log("Favorites retrieved")
        return favorite;
    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    }
    
}

module.exports = {
    addFavorite,
    updFavorite,
    delFavorite,
    getFavorites
}