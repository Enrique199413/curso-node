const authWiddleware = require('./auth')
const bodyParser = require('body-parser')

const setupAuthMiddleware = app => {
    app.use(bodyParser.json())
    authWiddleware.init()
    app.use(authWiddleware.protectWithJwt)

}

module.exports = setupAuthMiddleware