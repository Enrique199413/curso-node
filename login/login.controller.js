const jwt = require('jsonwebtoken')

const loginWithUsernameAndPassword = (username, password) => {
    // TODO find one in userd
    const options = {
        expiresIn: "60000ms"
    }
    const token = jwt.sign({username, password}, 'nodeJSSecret', options)
    return token

}

const loginWithUsernameAndLastname = (username, lastname) => {
    // TODO find one in userd on mongo
    const options = {
        expiresIn: "60000ms"
    }
    const token = jwt.sign({username, lastname}, 'nodeJSSecret')
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
    loginWithUsernameAndLastname,
    verifyToken
}