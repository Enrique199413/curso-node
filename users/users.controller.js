const { MongoClient } = require('mongodb')
const uri = "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const registerUser = async({ username, password }) => {
    const client = new MongoClient(uri);
    try {
        await client.connect()
        const collectionUser = client.db('finalExam').collection('users')
        const { insertedId } = await collectionUser.insertOne({
            username,
            password
        })
        await client.close()
        return Promise.resolve(insertedId)
    } catch (e) {
        return Promise.reject(e)
    }
}

const getRegisterUser = async() => {
    const client = new MongoClient(uri);
    try {
        await client.connect()
        const collectionUser = client.db('finalExam').collection('users')
        const allUsers = collectionUser.find({});
        const dataUsers = []
        allUsers.forEach(item => {
            dataUsers.push(item);
        })
        await client.close()
        return Promise.resolve(dataUsers)
    } catch (e) {
        return Promise.reject(e)
    }
}


module.exports = { registerUser, getRegisterUser }