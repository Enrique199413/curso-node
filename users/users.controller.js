const { MongoClient } = require('mongodb')
const uri = "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    // const uri = "mongodb+srv://america:tBKoZm7UEJtx9Qmt@cluster0.sfkzk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const addUser = async({ email, password }) => {
    console.log(email, password, 'contorller user')
    const client = new MongoClient(uri);
    try {
        await client.connect()
        console.log('se conecta')
            // const userCollection = client.db('users').collection('users')
            // const existRegister = await userCollection.find({
            // email,
            // password
            // })
            // const user = []
            // await existRegister.forEach(item => {
            // console.log(item)
            // user.push(item)
            // })
            // if (user.length === 0) {
            // const { insertedId } = await userCollection.insertOne({
            // email,
            // password
            // })
            // return Promise.resolve(insertedId)
            // }
        await client.close()
            // return Promise.reject({
            // message: "Not created",
            // userExistWithID: user[0].id
            // })
    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    }
}

module.exports = { addUser }