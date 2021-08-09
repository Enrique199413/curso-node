const router = require('express').Router()
const { addUsersHttp, getAllUsersHttp } = require('./users.http')

router.post('/register', addUsersHttp)
router.get('/users', getAllUsersHttp)

module.exports.usersRouter = router