const uri = "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//const uri = "mongodb://localhost:27017/test"
const mongoConnection = require('../utils/mongo.utils')(uri)
const cipher = require('../utils/cipher')

const addUser = async ({username, password = 'passwordchido'}) => {
    try {
        return new Promise((resolve, reject) => {
            cipher.hashPassword(password, async(error, passwordCipher) => {
                const {exec, closeCurrentConnection} = await mongoConnection('finalExam','users').connect()

                const user = await exec('findOne', {username})
                if (!user) {
                    exec('insertOne', {
                        username, password: passwordCipher
                    }).then(({insertedId}) => {
                        resolve({userId: insertedId})
                    })
                }else {
                    await closeCurrentConnection()
                    reject({message: "Username exist please login"})
                }
                
            })
        })
    } catch(e) {
        console.error(e)
        return Promise.reject(e)
    }
}

const getAllUsers = async() => {
    try {
        const {exec, closeCurrentConnection} = await mongoConnection('finalExam','users').connect()

        const users = await exec('find', {})
        const data = []
        await users.forEach(item => {
            data.push(item)
        })

        await closeCurrentConnection()
        return Promise.resolve(data)

    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    }
}

module.exports = { addUser, getAllUsers }