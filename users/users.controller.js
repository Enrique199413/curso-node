const {MongoClient} = require('mongodb')
const ObjectID = require('mongodb').ObjectID;
const {objectUtils} = require('../utils/utils')
const uri = process.env.MONGO_DB_URI
const mongoConection = require('../utils/mongo.utils')(uri)

console.log('validar la uri ', uri)
const addUserConnectionClousure = async ({name, lastName, surName}) => {

    try {
        const {exec } = await mongoConection('users', 'users').connect()
        const existUser = await exec('findOne', {name, lastName, surName})

        console.log(existUser)

        if (!existUser) {
            exec('insertOne',{name, lastName, surName
            }).then( insertedId => {
                return Promise.resolve(insertedId)
            })

        }

        await client.close()
        return Promise.reject({
            message: 'Cant create a register',
            userExistWithID: existUser._id
        })
    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    }



}

const addUser = async ({name, lastName, surName}) => {
// {surName, name, }
    console.log(name, lastName, surName)
    //return Promise.resolve({id: 1121212}) // TODO primera validacion
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

    try {
        await client.connect()
        const userCollection = client.db('users').collection('users')
        // Validar si existe un usuario con los mismo valorres
        const existUser = await userCollection.findOne({
            name, lastName, surName
        })

        console.log(existUser)

        if (!existUser) {
            const { insertedId } = await userCollection.insertOne({
                name,
                lastName,
                surName
            })
            return Promise.resolve(insertedId)

        }

        await client.close()
        return Promise.reject({
            message: 'Cant create a register',
            userExistWithID: existUser._id
        })
    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    }



}

const getAllUser = async () => {
    console.log(uri, '----')
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

    try {
        await client.connect()
        const userCollection = client.db('users').collection('users')
        const cursorUsers = userCollection.find({})
        const data = []
        await cursorUsers.forEach(item => {
            data.push(item)
        })

        await client.close()
        return Promise.resolve(data)

    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    }

    /*const users = new Promise((resolve, reject) => {
        client.connect(err => {
            if (err) {
                reject(err)
            }
            const userCollection = client.db('users').collection('users')
            const cursorUsers = userCollection.find({})

            const data =[]
            cursorUsers.forEach(item => {
                console.log(item)

                data.push(item)
            }).then(finish => {
                console.log(finish, 'El resultad')
                resolve(data)
                client.close()
            })

            console.log(userCollection.find({}))

            //resolve()
           //client.close()
        })
    })

    return users
*/

    // Refactor
}

const updateUser = async (id, { name, lastName, surName}) => {
    //console.log('Controoller - update',id, name, lastName, surName)
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

    try {
        console.log(name, lastName, surName, uri)
        console.log('aqui entre')
        await client.connect()
        const userCollection = client.db('users').collection('users')
        // Validar si existe un usuario con los mismo valorres
        let filter = {
            '_id': ObjectID(id)
        }
        if (uri === 'mongodb://localhost:27017/users') {
            // TODO only for test
            filter = {'_id': id}
        }

        console.log(filter)
        const existUserValidID = await userCollection.findOne(filter)

        const existUserByName = await userCollection.findOne({
            name, lastName, surName
        })

        console.log('existUserValidID', existUserValidID)

        if (!existUserByName) {
            console.log('Not repet name, surname existen')
            if (existUserValidID) {
                console.log('id existent and update')
            const updateDoc = {
                $set: {
                    name,
                    lastName,
                    surName
                }
            }
            const {updateId} = await userCollection.updateOne(filter, updateDoc)
                console.log(updateId)
            return Promise.resolve(updateId)
            }

        }

        await client.close()
        return Promise.reject({
            message: 'Cant update a register, because id not exist or data exist',
            // userNotExist: existUserValidID,
            userNotExistWithID: id
        })
    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    }



}

const deleteUser = async (id) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

    try {
        await client.connect()
        const userCollection = client.db('users').collection('users')
        let filter = {
            '_id': ObjectID(id)
        }
        if (uri === 'mongodb://localhost:27017/users') {
            // TODO only for test
            filter = {'_id': id}
        }

        console.log('Filter', filter)
        const existUserValidID = await userCollection.findOne(filter)
        console.log('existUserValidID', existUserValidID)

        if (existUserValidID) {
            let messageDelete = ''
            let statusDelete
            const deleteUserStatus = await userCollection.deleteOne(filter)
            console.log(deleteUserStatus)
            if (deleteUserStatus.deletedCount === 1) {
                messageDelete =`Successfully deleted user by id ${id}, name: ${existUserValidID.name}`;
                statusDelete = 201
            } else {
                messageDelete = `No user found with id: ${id}. Dont deleted user.`;
                statusDelete = 400
            }
            return Promise.resolve({messageDelete, statusDelete})
        }

        await client.close()
        return Promise.reject({
            message: 'Cant delete user, because not exist',
            // userNotExist: existUserValidID,
            userNotExistWithID: id
        })


    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    }

}

const getByParams = async (paramsFilter) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

    try {
        await client.connect()
        const userCollection = client.db('users').collection('users')
        const cursorUsers = await userCollection.find(paramsFilter)
        const data = []
        await cursorUsers.forEach(item => {
             data.push(item)
        })

        await client.close()
        return Promise.resolve({count: data.length, data})

    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    }

}

module.exports.addUser = addUser
module.exports.getAllUser = getAllUser
module.exports.updateUser = updateUser
module.exports.deleteUser = deleteUser
module.exports.getByParams = getByParams
module.exports.addUserConnectionClousure = addUserConnectionClousure




// De las dos formas es valido
// module.exports = {
//     addUser,
//     getAllUser
// }
