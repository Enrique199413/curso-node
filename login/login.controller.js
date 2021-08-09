const uri = "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//const uri = "mongodb://localhost:27017/test"
const mongoConnection = require('../utils/mongo.utils')(uri)
const cipher = require('../utils/cipher')
const jwt = require('jsonwebtoken')

const loginWithUsernameAndPassword = async(username, password) => {
    try {
        const {exec, closeCurrentConnection} = await mongoConnection('finalExam','users').connect()
        const user = await exec('findOne', {username})
        if (user) {
            return new Promise((resolve, reject) => {
                // if (password === user.password) {
                //     const token = jwt.sign({username, password}, 'nodeJSSecret') //KEy por env
                //     resolve({token})
                // } else {
                //     reject({message: "Authentication failed"})
                // }
                cipher.comparePassword(password, user.password, async(error, valid) => {
                    if (valid) {
                        const token = jwt.sign({username, password}, 'nodeJSSecret') //KEy por env
                        resolve({token})
                    } else {
                        reject({errors: "Please add correct username and password"})
                    }
                })
            })
        } else {
            return Promise.reject({errors: "Please add correct username and password"})
        }

    } catch(e) {
        console.error(e)
        return Promise.reject(e)
    }
    
}

module.exports = {
    loginWithUsernameAndPassword
}