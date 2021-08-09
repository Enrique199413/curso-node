const uri = "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//const uri = "mongodb://localhost:27017/test"
const mongoConnection = require('../utils/mongo.utils')(uri)


const getAllSpaces = async() => {
    try {
        const {exec, closeCurrentConnection} = await mongoConnection('finalExam','spaces').connect()

        const spaces = await exec('find', {})
        const data = []
        await spaces.forEach(item => {
            data.push(item)
        })

        await closeCurrentConnection()
        return Promise.resolve(data)

    } catch (e) {
        console.log(e)
        return Promise.reject(e)
    }
}

module.exports = {
    getAllSpaces
}