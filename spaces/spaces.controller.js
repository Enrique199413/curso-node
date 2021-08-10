const uri = "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const {MongoClient, ObjectId} = require('mongodb')

const readAllSpaces = async () => {

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

    const spaces = new Promise(async (resolve, reject) => {
        try {
            await client.connect()
            const spacesCollection = client.db('finalExam').collection('spaces')
            const cursorSpaces = spacesCollection.find({})
            const data= []
            await cursorSpaces.forEach(item => {
                data.push(item)
            })
            await client.close()
            resolve(data)
        } catch (e) {
            reject(e)
        }
    })
    return spaces 
}


module.exports = {
    readAllSpaces
}