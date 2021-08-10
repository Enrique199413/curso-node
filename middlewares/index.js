const authMiddleware = require('./authMiddlewares')
const bodyParser = require('body-parser')

const setupAuthMiddleware = app => {
    app.use(bodyParser.json())
    authMiddleware.init()
    app.use(authMiddleware.protectWithJwt)
}

module.exports = setupAuthMiddleware