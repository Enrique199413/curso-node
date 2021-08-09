const router = require('express').Router()
const {objectUtils} = require('../utils/general.utils')
const {
    getAllUsersHttp,
    addUsersHttp
} = require('./users.http')
/**
 * Add valid for body
 */
router.post('/', (req, res, next) => {
    const {message: messageValidObjectStructure,
        canContinue: isValidBody
    } = objectUtils.existPropertiesOnObject(req.body, 'username', 'password')
    console.log('POST', isValidBody, messageValidObjectStructure)
    if (!isValidBody) {
        res.status(400).json({message: messageValidObjectStructure})
        return
    }


    const {message: messageValidValuesOnKeys,
        canContinue: isValidValuesOnBody
    } = objectUtils.allKeysWithValidData(req.body)

    if (!isValidValuesOnBody) {
        res.status(400).json({message: messageValidValuesOnKeys})
        return
    }
    next()


}, addUsersHttp)

// get all users
router.get('/', getAllUsersHttp)

module.exports.userRouter = router