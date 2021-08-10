const uri = "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const {MongoClient, ObjectId} = require('mongodb')
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

const addFavorites = async ({userId, spaceId}) => {

    try {
        await client.connect()
        const favoritesCollection = client.db('finalExam').collection('favorites')
        const favoritesFound = await favoritesCollection.findOne({
            userId
        })  
        if(favoritesFound && !favoritesFound.favorites.find(space => space == spaceId)){
            await favoritesCollection.findOneAndUpdate(
                {"userId": userId},
                {$addToSet: { favorites: spaceId }}
            )
        } else if(favoritesFound && favoritesFound.favorites.find(space => space == spaceId)){
            return  Promise.reject({
                message: 'The user already set this favorite, please add another'
            })
        } else if(!favoritesFound) {
            await favoritesCollection.insertOne({
                userId, favorites:[spaceId]
            })
        }
        await client.close()
        return  Promise.resolve({
            message: 'IdUser with favorite created'
        })

    } catch (e) {
        console.log(e)
        return Promise.reject(e)

    }
}

const getAllFavorites = async (idUser) => {

        try {
            await client.connect()
            const favoritesCollection = client.db('finalExam').collection('favorites')
            const cursorFavorites = await favoritesCollection.findOne({
                userId: idUser
            })
            await client.close()

            if(!cursorFavorites) {
                return  Promise.reject({
                    message: "IdUser hasn't favorites please add one and try again"
                })
            }
            return cursorFavorites.favorites
        } catch (e) {
            Promise.reject(e)
        }
}

const updateFavorites =  async (idUser, favorites, allSpaces) => {

    try {
        await client.connect()
        const favoritesCollection = client.db('finalExam').collection('favorites')

        let allFound = true
        for (const favorite of favorites) {
            let found = false
            for (const space of allSpaces) {
                if(space._id == favorite) {
                    found = true
                }
            }
            if (!found) {
                allFound = false
                break
            }
        }

        const userFavorites = await favoritesCollection.findOne({
            userId: idUser
        })

        //El usuario no existe o no tiene favoritos
        if (!userFavorites || userFavorites.favorites.length < 1) {
            return  Promise.reject({
                message: "IdUser hasn't get favorites list, please add first and then try updated"
            })
        }
        //el usuario existe, tiene favoritos y los favoritos a insertar existen
        if (allFound) {
            const cursorFavorites = await favoritesCollection.findOneAndUpdate(
                {"userId": idUser},
                {$set: { favorites: favorites} }
            )
            return  Promise.resolve({
                message: 'IdUser favorites list updated'
            })
        } else {
            //el usuario existe, tiene favoritos y alguno de los favoritos a insertar NO EXISTE
            await client.close()
            return  Promise.reject({
                message: 'Invalid spaces id, please verify and try again',
                "value": favorites
            })
        }
        
        
    } catch (e) {
        Promise.reject(e)
    }
}

const deleteFavorites = async (userId) => {

    try {
        await client.connect()
        const favoritesCollection = client.db('finalExam').collection('favorites')

        const userFavorites = await favoritesCollection.findOne({
            userId: userId
        })

        //El usuario no existe o no tiene favoritos
        if (!userFavorites || userFavorites.favorites.length < 1) {
            return  Promise.reject({
                message: "IdUser hasn't get favorites list, please add first and then try deleted"
            })
        }

        await favoritesCollection.findOneAndUpdate(
            {"userId": userId},
            {$set: { favorites: []}}
        )
        await client.close()
        return  Promise.resolve({
            message: 'favorite list of userId deleted'
        })

    } catch (e) {
        console.log(e)
        return Promise.reject(e)

    }
}



module.exports = {
    addFavorites,
    getAllFavorites,
    updateFavorites,
    deleteFavorites
}