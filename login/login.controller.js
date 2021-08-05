const jwt = require('jsonwebtoken')

const loginWithEmailAndPassword = (email, password) => {
    console.log('hola controlles')
    const token = jwt.sign({ email, password }, 'nodeJSSecret') //KEy por env
    return token
}

// const getInfoUsers = (token) => {
// const users = jwt.verify(token)
// return users
// }

module.exports = {
    loginWithEmailAndPassword
}