const jwt = require('jsonwebtoken')

const loginWithEmailAndPassword = (email, password) => {
    const token = jwt.sign({ email, password }, 'nodeJSSecret') //KEy por env
    return token
}

module.exports = {
    loginWithEmailAndPassword
}