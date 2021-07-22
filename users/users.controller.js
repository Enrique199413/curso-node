const { MongoClient, ObjectId } = require('mongodb')
const uri = "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const mongoConnection = require('../utils/mongo.utils')(uri)

//por alguna razon no me sirve
const addUser = async({ name, lastName, surName }) => {
    // const client = new MongoClient(uri, { useNewParser: true, useUnifiedTopology: true });
    // try {
    // await client.connect()
    // const userCollection = client.db('users').collection('users')
    // const { insertedId } = await userCollection.insertOne({ name, lastName, surName })
    // await client.close()
    // return Promise.resolve(insertedId)
    // } catch (e) {
    // console.error(e)
    // return Promise.reject(e)
    // }
    try {
        const { exec: execUsers, closeCureentConnections } = await mongoConnection('users', 'users').connect()
        const user = await execUsers('findOne', { name, lastname, surName })
        if (!user) {
            execUsers('insertOne', { name, lastName, surName }).then(insertedId => { return Promise.resolve(insertedId) })
        }
        await closeCureentConnections()
        return Promise.reject({
            message: 'Cant create a register',
            userExistWithID: user._id
        })
    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    }
}

const getAllUsers = () => {
    const client = new MongoClient(uri, { useNewParser: true, useUnifiedTopology: true });
    const users = new Promise((resolve, reject) => {
        client.connect(err => {
            if (err) { reject(err); }
            const userCollection = client.db('users').collection('users');
            const cursorUsers = userCollection.find({});
            const data = []
            cursorUsers.forEach(element => {
                console.log(element);
                data.push(element);
            }).then(finish => {
                resolve(data);
                client.close();
            })
        })
    })
    return users;
}

const updateUser = async(id, { name }) => {
    const client = new MongoClient(uri, { useNewParser: true, useUnifiedTopology: true });
    try {
        await client.connect()
        const userCollection = client.db('users').collection('users')
        const { updateUser } = await userCollection.updateOne({ "_id": ObjectId(id) }, { $set: { "name": name } })
        await client.close()
        return Promise.resolve(updateUser)
    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    }

}

const deleteUser = async(id) => {
    const client = new MongoClient(uri, { useNewParser: true, useUnifiedTopology: true });
    try {
        await client.connect()
        const userCollection = client.db('users').collection('users')
        const { deleteId } = await userCollection.deleteOne({ "_id": ObjectId(id) })
        await client.close()
        return Promise.resolve(deleteId)
    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    }

}

const getUserId = async(id) => {
    const client = new MongoClient(uri, { useNewParser: true, useUnifiedTopology: true });
    try {
        await client.connect()
        const userCollection = client.db('users').collection('users')
        const { userId } = await userCollection.find({ _id: ObjectId(id) })
        await client.close()
        return Promise.resolve(userId)
    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    }
}

//otra forma de hacer el exports
// module.exports.addUser = addUser
// module.exports.getAllUsers = getAllUsers

module.exports = { addUser, getAllUsers, updateUser, deleteUser, getUserId }