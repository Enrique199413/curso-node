const router = require('express').Router()
const { registerUserHttp, getUserHttp } = require('./users.http')

const validatePropertiesOnObject = require('../middlewares/authUser')

router.post('/', validatePropertiesOnObject, registerUserHttp)
router.get('/', getUserHttp)

module.exports.usersRouter = router