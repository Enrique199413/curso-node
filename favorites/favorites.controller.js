const uri = "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//const uri = "mongodb://localhost:27017/test"
const mongoConnection = require('../utils/mongo.utils')(uri)
const { objectUtils } = require('../utils/utils')
var ObjectId = require('mongodb').ObjectID

const addFavorites = async({userId, spaceId}) => {
    let favorites = []
    try {

        //Validamos si userId existe
        const { exec: execU, closeCurrentConnection: closeCurrentConnectionU } = await mongoConnection('finalExam', 'users').connect()
        let _id = ObjectId(userId);
        const user = await execU('findOne', {_id})
        //await closeCurrentConnectionU()
        if (!user) {
            return Promise.reject({
                message: "Invalid user id, please verify and try again",
                value: userId
              })
        }
        await closeCurrentConnectionU()
        //Validamos si spaceId existe
        const { exec: execS, closeCurrentConnection: closeCurrentConnectionS } = await mongoConnection('finalExam', 'spaces').connect()
        _id = ObjectId(spaceId)
        const space = await execS('findOne', {_id})
        //await closeCurrentConnectionS()
        if (!space) {
            return Promise.reject({
                message: "Invalid space id, please verify and try again",
                value: spaceId
              })
        }
        await closeCurrentConnectionS()
        const { exec: execF, closeCurrentConnection: closeCurrentConnectionF } = await mongoConnection('finalExam', 'favorites').connect()
        const favorite = await execF('findOne', {userId})
        //Validamos si existe registro de usuario
        if(!favorite) {
            favorites.push(spaceId)
            const favoritesResp = await execF('insertOne', {userId, favorites})
            return Promise.resolve({message: "IdUser with favorite created"})
        } else {
            //Validamos si ya existe el space en favoritos
            favorites = favorite.favorites
            let find = favorites.find(element => element === spaceId)

            if (!find) {
                //Si no existe se agrega
                favorites.push(spaceId)
                const {modifiedCount} = await execF('updateOne',{ $set: {favorites}}, {userId})
                await closeCurrentConnectionF()
                if (modifiedCount !== 1) {
                    return Promise.reject({error: "userNotFund try again"})
                } else {
                    return Promise.resolve({message: "IdUser with favorite created"})
                }
            } else {
                return Promise.resolve({message: "The user already set this favorite, please add another"})
            }

            // const favoriteUp = await execF('findOne', {userId})
            // await closeCurrentConnection()
            
        }
    } catch (e) {
        console.log(e)
        return Promise.reject(e)
    }
}

const getFavorites = async(userId) => {
    try {
        const {exec, closeCurrentConnection} = await mongoConnection('finalExam','favorites').connect()

        const favorites = await exec('findOne', {userId})
        await closeCurrentConnection()
        if (favorites) {
            return Promise.resolve(favorites.favorites)
        } 

        //await closeCurrentConnection()
        return Promise.reject({ message: "IdUser hasn't favorites please add one and try again" })

    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    }
}

const getAllFavorites = async() => {
    try {
        const {exec, closeCurrentConnection} = await mongoConnection('finalExam','favorites').connect()

        const favorites = await exec('find', {})
        const data = []
        await favorites.forEach(item => {
            data.push(item)
        })

        await closeCurrentConnection()
        return Promise.resolve(data)

    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    }
}

const deleteFavorites = async({userId}) => {
    try {
        const { exec, closeCurrentConnection } = await mongoConnection('finalExam', 'favorites').connect()

        const favoritesUser = await exec('findOne', {userId})

        //Validamos si ya existe userId favoritos
        if(favoritesUser && favoritesUser.favorites.length > 0) {
            const {modifiedCount} = await exec('updateOne',{ $set: {favorites: []}}, {userId})
            await closeCurrentConnection()
            return Promise.resolve({ message: "favorite list of userId deleted" })
        } else {
            return Promise.resolve({message: "IdUser hasn't get favorites list, please add first and then try deleted"})
        }
    } catch (e) {
        console.log(e)
        return Promise.reject(e)
    }
}

const updateFavorites = async({userId, favorites}) => {
    try {
        if (favorites.length <= 0) {
            return Promise.resolve({message: "List is empty if you delete list of favorites please use DELETE method"})
        } else {
            const { exec, closeCurrentConnection} = await mongoConnection('finalExam', 'favorites').connect()
            const favorite = await exec('findOne', {userId})
            //Validamos si existe registro de usuario
            if(!favorite) {
                // favorites.push(spaceId)
                // const favoritesResp = await exec('insertOne', {userId, favorites})
                return Promise.resolve({message: "IdUser hasn't get favorites list, please add first and then try updated"})
            } else {
                //Validamos si spaceId existe
                const { exec: execS, closeCurrentConnection: closeCurrentConnectionS } = await mongoConnection('finalExam', 'spaces').connect()
                const spaces = await execS('find', {})
                const data = []
                await spaces.forEach(item => {
                    data.push(item._id)
                })

                const invalidId = []

                await favorites.forEach(id => {
                    if (!data.find(element => element.toString() === id.toString())) {
                        invalidId.push(id)
                    }
                })

                if (invalidId.length > 0) {
                    return Promise.resolve({
                        message: "Invalid spaces id, please verify and try again",
                        value: invalidId
                    })
                } else {
                    const { exec, closeCurrentConnection} = await mongoConnection('finalExam', 'favorites').connect()
                    const {modifiedCount} = await exec('updateOne',{ $set: {favorites}}, {userId: userId.toString()})
                    if (modifiedCount !== 1) {
                        return Promise.reject({message: "There are no changes"})
                    } else {
                        return Promise.resolve({message: "IdUser favorites list updated"})
                    }
                }
                
                //await closeCurrentConnectionS()
                // //Validamos si ya existe el space en favoritos
                // favorites = favorite.favorites
                // let find = favorites.find(element => element === spaceId)

                // if (!find) {
                //     //Si no existe se agrega
                //     favorites.push(spaceId)
                //     const {modifiedCount} = await execF('updateOne',{ $set: {favorites}}, {userId})
                //     if (modifiedCount !== 1) {
                //         return Promise.reject({error: "userNotFund try again"})
                //     }
                // }

                // const favoriteUp = await execF('findOne', {userId})
                // // await closeCurrentConnection()
                // return Promise.resolve(favoriteUp)
                //return Promise.resolve({message: "The user already set this favorite, please add another"})
            }
        }
    
        
    } catch (e) {
        console.log(e)
        return Promise.reject(e)
    }
}

const _deleteFavorites = async({userId, spaceId}) => {
    try {
        const { exec, closeCurrentConnection } = await mongoConnection('finalExam', 'favorites').connect()

        const favoritesUser = await exec('findOne', {userId})

        let favorites = favoritesUser.favorites

        if(favoritesUser && favoritesUser.favorites.length > 0) {
            //Validamos si ya existe el space en favoritos
            if (spaceId && favoritesUser.favorites.find(element => element === spaceId)) {
                favorites = favorites.filter(element => element !== spaceId)
                const {modifiedCount} = await exec('updateOne',{ $set: {favorites}}, {userId})
                if (modifiedCount !== 1) {
                    return Promise.reject({error: "userNotFund try again"})
                } else {
                    return Promise.resolve({ message: "favorite list of userId deleted" })
                }
            } else {
                const {modifiedCount} = await exec('updateOne',{ $set: {favorites: []}}, {userId})
                if (modifiedCount !== 1) {
                    return Promise.reject({error: "userNotFund try again"})
                } else {
                    return Promise.resolve({ message: "favorite deleted" })
                }
            }
        } else {
            return Promise.resolve({message: "IdUser hasn't get favorites list, please add first and then try deleted"})
        }
    } catch (e) {
        console.log(e)
        return Promise.reject(e)
    }
}

module.exports = { addFavorites, deleteFavorites, getFavorites, getAllFavorites, updateFavorites }