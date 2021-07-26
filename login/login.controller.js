const jwt = require('jsonwebtoken')

const loginWithUsernameAndPassword = (username, password) => {
    // TODO find one in userd
    const options = {
        expiresIn: "120ms"
    }
    const token = jwt.sign({username, password}, 'nodeJSSecret', options)
    return token

}

const verifyToken = (token) => {
    jwt.verify(token, 'nodeJSSecret', function(err, decoded) {
        if (err) {
            return err
            // err = {
            //     name: 'TokenExpiredError',
            //     message: 'jwt expired'
            // }
        }
    });
}

module.exports = {
    loginWithUsernameAndPassword,
    verifyToken
}