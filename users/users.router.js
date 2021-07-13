const router = require('express').Router()
const { addUsersHttp, getAllUsersHttp, updateUserHttp, deleteUserHttp, getUserIdHttp } = require('./users.http')
const { objectUtils } = require('../utils/utils')

router.post('/', (req, res, next) => {
    const {
        message: validstructure,
        canContinue: isValidBody
    } = objectUtils.existPropertiesOnObject(req.body, 'name', 'lastName', 'surName')
    if (!isValidBody) {
        res.status(400).json({ message: validstructure })
        return
    }
    const {
        message: messageValidValuesOnKeys,
        canContinue: isValidValuesBody
    } = objectUtils.allKeysWithValidData(req.body)
    if (!isValidValuesBody) {
        res.status(400).json({ message: messageValidValuesOnKeys })
        return
    }
    next()
}, addUsersHttp)
router.get('/', getAllUsersHttp)
router.put('/:id', updateUserHttp)
router.delete('/:id', deleteUserHttp)
router.get('/:id', (req, res, next) => { return res.body }, getUserIdHttp)


module.exports.usersRouter = router