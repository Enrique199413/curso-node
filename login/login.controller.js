const jwt = require('jsonwebtoken')

const loginWithUsernameAndPassword = (username, password) => {
    // TODO find in users
    const token = jwt.sign({ username, password }, 'nodeJSSecret') //KEy por env
    return token
}

// const getInfoUsers = (token) => {
// const users = jwt.verify(token)
// return users
// }

module.exports = {
    loginWithUsernameAndPassword
}