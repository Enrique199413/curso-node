const {MongoClient} = require('mongodb')
const ObjectID = require('mongodb').ObjectId;
const uri = process.env.MONGO_DB_URI
const dbName = 'finalExam'
const collectionName = 'users'
const mongoConection = require('../utils/mongo.utils')(uri)

const getAllUsers = async () => {
    console.log(uri)
    try {
        const {exec } = await mongoConection(dbName, collectionName).connect()
        const cursorUsers = await exec('find', {})

        const userList = []
        await cursorUsers.forEach(item => {
            userList.push(item)
        })

        return Promise.resolve(userList)

    }catch (e) {
        console.log(e)
        return Promise.reject(e)

    }
}

const addUsers = async ({username, password}) => {
    try {
        const {exec } = await mongoConection(dbName, collectionName).connect()
        const userFound = await exec('findOne', {username})

        console.log(userFound)
        if (userFound === null) {
            const {insertedId} = await exec('insertOne', {
                username,
                password
            })
            return Promise.resolve({'userId': insertedId})
        }


        return Promise.reject({
            message: 'Username exist please login'
        })

    }catch (e) {
        return Promise.reject(e)

    }
}

const getByUsernamePassword = async ({username, password})=> {
    console.log(username, password)
    console.log(uri)
    try {
        const {exec, closeCurrentConnections } = await mongoConection(dbName, collectionName).connect()
        const userFound = await exec('findOne', {username, password})
        console.log('user', userFound)

        //await closeCurrentConnections()
        return Promise.resolve(userFound)

    }catch (e) {
        return Promise.reject(e)

    }
}

module.exports.getAllUsers = getAllUsers
module.exports.addUsers = addUsers
module.exports.getByUsernamePassword = getByUsernamePassword