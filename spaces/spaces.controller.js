const uri = process.env.MONGO_DB_URI
const dbName = 'finalExam'
const collectionName = 'spaces'
const mongoConection = require('../utils/mongo.utils')(uri)

const getAllSpaces = async () => {
    try {
        const {exec } = await mongoConection(dbName, collectionName).connect()
        const cursorSpaces = await exec('find', {})
        const spacesList = []

        await cursorSpaces.forEach(item => {
            spacesList.push(item)
        })

        return Promise.resolve(spacesList)

    }catch (e) {
        return Promise.reject(e)

    }
}

module.exports.getAllSpaces = getAllSpaces