const router = require('express').Router()
const { addUsersHttp, getAllUsersHttp, updateUserHttp, deleteUserHttp } = require('./users.http')
const validatePropertiesOnObject = require('../middlewares/validatePropertiesOnObject')
 
router.post('/', validatePropertiesOnObject ,addUsersHttp)
router.get('/', getAllUsersHttp)
router.get('/:name', getAllUsersHttp)
router.get('/:lastName', getAllUsersHttp)
router.get('/:surName', getAllUsersHttp)
router.put('/:id', validatePropertiesOnObject, updateUserHttp)
router.delete('/:id', deleteUserHttp)
 
module.exports.usersRouter = router