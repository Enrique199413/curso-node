const uri = "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const jwt = require('jsonwebtoken')
const {MongoClient, ObjectId} = require('mongodb')

const addUser = async ({username, password}) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

    try {
        await client.connect()
        const userCollection = client.db('finalExam').collection('users')
        const user = await userCollection.findOne({
            username
        })
        if (!user) {
            const { insertedId } = await userCollection.insertOne({
                username, password
            })
            return Promise.resolve(insertedId)
        }
        
        await client.close()
        return  Promise.reject({
            message: 'Username exist please login'
        })
    } catch (e) {
        console.log(e)
        return Promise.reject(e)

    }
}

const readUser = async ({username, password}) => {

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

    try {
        await client.connect()
        const userCollection = client.db('finalExam').collection('users')
        const user = await userCollection.findOne({
            username, password
        })
        if(!user) {
            return  Promise.reject({
                message: 'Please add correct username and password'
            }) 
        }
        await client.close()
        const userName = user.username
        const userPassword = user.password
        const token = jwt.sign({userName, userPassword}, 'nodeJSSecret')
        return Promise.resolve(token)

    } catch (e) {
        console.log(e)
        return Promise.reject(e)

    }
}

module.exports = {
    addUser,
    readUser
}

