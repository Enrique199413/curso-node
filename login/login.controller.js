const jwt = require('jsonwebtoken')

const loginWithUsernameAndPassword = (username, password) => {
    // TODO find one in userd
    const options = {
        expiresIn: "120ms"
    }
    const token = jwt.sign({username, password}, 'nodeJSSecret')
    return token

}


module.exports = {
    loginWithUsernameAndPassword
}