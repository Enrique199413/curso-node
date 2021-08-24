const { MongoClient } = require('mongodb')
const uri = "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const getSpaces = async() => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect()
        const spacesCollection = client.db('finalExam').collection('spaces')
        const findSpaces = spacesCollection.find({})
        const dataSpaces = []
        findSpaces.forEach(item => {
            dataSpaces.push(item);
        })
        await client.close()
        return Promise.resolve(dataSpaces)
    } catch (e) {
        return Promise.reject(e)
    }
}

module.exports = { getSpaces }