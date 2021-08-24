const {MongoClient} = require('mongodb')
const ObjectID = require('mongodb').ObjectId;
const uri = process.env.MONGO_DB_URI
const dbName = 'finalExam'
const collectionName = 'favorites'
const mongoConection = require('../utils/mongo.utils')(uri)

const getAllFavorites = async () => {
    try {

        const {exec } = await mongoConection(dbName, collectionName).connect()
        const cursorFavorites = await exec('find', {})

        const favoritesList = []

        await cursorFavorites.forEach(item => {
            favoritesList.push(item)
        })

        return Promise.resolve(favoritesList)

    }catch (e) {
        return Promise.reject(e)

    }
}

const addFavorites = async ({userId, spaceId}) => {
    try {
        const {exec } = await mongoConection(dbName, collectionName).connect()
        const favoriteFound = await exec('findOne', {userId})
        console.log('favoriteFound', favoriteFound)

        if (!favoriteFound) {
            const {insertedId} = await exec('insertOne', {
                userId,
                favorites: [spaceId]
            })
            console.log(insertedId, 'insertedId')
            return Promise.resolve({'message': 'IdUser with favorite created'})
        }

        return Promise.reject({
            message: 'The user already set this favorite, please add another'
        })

    }catch (e) {
        return Promise.reject(e)

    }
}

const getByUserIdFavorites = async (idUser) => {
    try {
        const {exec } = await mongoConection(dbName, collectionName).connect()
        const favoritesByUser = await exec('findOne', {userId: idUser})

        return Promise.resolve(favoritesByUser)

    }catch (e) {
        return Promise.reject(e)

    }
}

const updateFavorites = async (userId, favorites) => {
    const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    let messageError = {message: ''}
    try {
        await client.connect()
        const userCollection = client.db(dbName).collection(collectionName)

        const userFound = userCollection.findOne({userId})
        const spacesCollection = client.db(dbName).collection('spaces')


        //Validar espacios
        for (const item of favorites) {
            try{
                const space = await spacesCollection.findOne({_id: ObjectID(`${item}`)})
                if (space == null) {
                    return Promise.resolve({
                        "message": "Invalid spaces id, please verify and try again",
                        value: favorites
                    });
                }
             } catch (e)  {
                return Promise.resolve({
                    "message": "Invalid spaces id, please verify and try again",
                    value: favorites
                });
            }
        }
        if (userFound) {
            const {matchedCount} = await userCollection.updateOne({
                userId
            }, {
                $set: {
                    favorites
                }
            })

            return Promise.resolve({'message': `IdUser ${userId} favorites list updated`})
        } else {
            return Promise.resolve({ "message": "IdUser hasn't get favorites list, please add first and then try updated"})
        }


    }catch (e) {
        return Promise.reject(e)

    }
}

const deleteFavorites = async (idUser) => {
    const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    try {
        await client.connect()
        const favoritesCollection = client.db(dbName).collection(collectionName)
        const favoritesByUser = await favoritesCollection.findOne({userId: idUser})

        if (favoritesByUser) {
            const {matchedCount} = await favoritesCollection.updateOne({
                userId: idUser
            }, {
                $set: {
                    favorites: []
                }
            })
            await client.close()
            if (matchedCount === 1) {
                return Promise.resolve({message: `favorite list of userId deleted"`})
            }

        } else{
            return Promise.resolve({message: `IdUser hasn't get favorites list, please add first and then try deleted`})
        }


    }catch (e) {
        return Promise.reject(e)

    }
}
module.exports.getAllFavorites = getAllFavorites
module.exports.addFavorites = addFavorites
module.exports.getByUserIdFavorites = getByUserIdFavorites
module.exports.updateFavorites = updateFavorites
module.exports.deleteFavorites = deleteFavorites



