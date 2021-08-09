const jwt = require('jsonwebtoken')

const loginWithUsernameAndPassword = (username, password) => {

    const token = jwt.sign({username, password}, 'nodeJSSecret')
    return token

}

module.exports = {
    loginWithUsernameAndPassword
}