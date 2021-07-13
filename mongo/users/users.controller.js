const { MongoClient, ObjectId } = require('mongodb');
// const { use } = require('../app');
const uri = "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
 
const addUser = async ({name, lastName, surName}) => {
    const client = new MongoClient(uri, { useNewParser: true, useUnifiedTopology: true });
    try {
        await client.connect()
        const userCollection = client.db('users').collection('users')

        const existRegister = await userCollection.find({
            name, lastName, surName
        })

        const user = []

        await existRegister.forEach(item => {
            user.push(item)
        })

        if (user.length === 0) {
            const { insertedId } = await userCollection.insertOne({
                name, lastName, surName
            })
            return Promise.resolve(insertedId)
        }
        
        await client.close()
        return Promise.reject({
            message: "Cant create a register",
            userExistWithID: user[0].id
        })
    } catch(e) {
        console.error(e)
        return Promise.reject(e)
    }
}

const updateUser = async (_id, {name, lastName, surName}) => {
    const client = new MongoClient(uri, { useNewParser: true, useUnifiedTopology: true });
    try {
        await client.connect()
        const userCollection = client.db('users').collection('users')

        const existRegister = await userCollection.find({_id})

        const user = []

        await existRegister.forEach(item => {
            user.push(item)
        })

        if (user.length === 0) {
            const { insertedId } = await userCollection.findOneAndUpdate(
                { _id: ObjectId(_id)},
                { $set: {"name": name, "lastName": lastName, "surName": surName}}, 
                { returnNewDocument: true }
                )
            console.log(insertedId)
            return Promise.resolve(insertedId)
        }
        
        await client.close()
        return Promise.reject({
            message: "User not exist",
            userExistWithID: user[0].id
        })
    } catch(e) {
        console.error(e)
        return Promise.reject(e)
    }
}

const deleteUser = async (_id) => {
    const client = new MongoClient(uri, { useNewParser: true, useUnifiedTopology: true });
    try {
        await client.connect()
        const userCollection = client.db('users').collection('users')

        const existRegister = await userCollection.find({_id})

        const user = []

        await existRegister.forEach(item => {
            user.push(item)
        })

        if (user.length === 0) {
            const { insertedId } = await userCollection.deleteOne(
                    { _id: ObjectId(_id)}
                )
            console.log(insertedId)
            return Promise.resolve(insertedId)
        }
        
        await client.close()
        return Promise.reject({
            message: "User not exist",
            userExistWithID: user[0].id
        })
    } catch(e) {
        console.error(e)
        return Promise.reject(e)
    }
}
 
const getAllUsers = ({name, lastName, surName}) => {
    // let params = name || lastName || surName;
    const client = new MongoClient(uri, { useNewParser: true, useUnifiedTopology: true });
    const users = new Promise((resolve, reject) => {
        client.connect(err => {
            if (err) { reject(err); }
            const userCollection = client.db('users').collection('users');
            // const cursorUsers = userCollection.find(params ? { $or: [{name}, {lastName}, {surName}]} : {});
            const cursorUsers = userCollection.find(name ? {name} : lastName ? {lastName} : surName ? {surName} : {});
            const data = []
            cursorUsers.forEach(element => {
                data.push(element);
            }).then(finish => {
                console.log(finish, 'El resultado');
                resolve(data);
                client.close();
            })
        })
    })
    return users;
}
 
// module.exports.addUser = addUser
// module.exports.getAllUsers = getAllUsers
 
module.exports = { addUser, getAllUsers, updateUser, deleteUser }