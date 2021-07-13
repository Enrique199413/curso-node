const uri = "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const e = require('express')
const {MongoClient} = require('mongodb')

const addUser = async ({name, lastName, surName}) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

    try {
        await client.connect()
        const userCollection = client.db('users').collection('users')
        const user = await userCollection.findOne({
            name, lastName, surName
        })
        console.log(user)
        if (!user) {
            const { insertedId } = await userCollection.insertOne({
                name, lastName, surName
            })
            return Promise.resolve(insertedId)
        }
        
        await client.close()
        return  Promise.reject({
            message: 'Cant create a register',
            userExistWithId: user._id
        })
    } catch (e) {
        console.log(e)
        return Promise.reject(e)

    }
    return users 
}

const upDateUser = async (_id ,{name, lastName, surName}) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

    try {
        await client.connect()
        const userCollection = client.db('users').collection('users')
        await userCollection.save({
            _id, name, lastName, surName
        })
        return Promise.resolve({_id, name, lastName, surName})
        
        await client.close()

    } catch (e) {
        console.log(e)
        return Promise.reject(e)

    } 
    return 
}

const getAllUsers = () => {

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    const users = new Promise(async (resolve, reject) => {

        try {
            await client.connect()
            const userCollection = client.db('users').collection('users')
            const cursorUsers = userCollection.find({})
            const data= []
            await cursorUsers.forEach(item => {
                data.push(item)
            })
            await client.close()
            resolve(data)
        } catch (e) {
            reject(e)
        }
    })
    return users 
}


module.exports = {
    addUser,
    getAllUsers,
    upDateUser
}