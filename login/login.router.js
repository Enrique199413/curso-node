const router = require('express').Router()
const loginHttp = require('./login.http')

router.post('/', loginHttp)

module.exports.loginRouter = router