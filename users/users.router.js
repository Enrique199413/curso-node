const router = require('express').Router()

const { addUserHttp, readUserHttp } = require('./users.http')


//create
router.post('/register',addUserHttp)

//read
router.post('/login', readUserHttp)


module.exports.usersRouter = router