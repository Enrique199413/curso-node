const router = require('express').Router()
const {addUserHttp, getAllUserHttp, upDateUserHttp} = require('./users.http')
const { objectUtils } = require('../utils/utils')

router.post('/', (req, res, next) => {
    const {
        message: messageValidObjectStructure,
        canContinue: isValidBody
    } = objectUtils.existPropertiesOnObject(req.body, 'name', 'lastName', 'surName')
    if (!isValidBody) {
        res.status(400).send({message: messageValidObjectStructure})
        return
    }
    const {
        message: messageValidValuesOnKeys,
        canContinue: isValidValuesOnBody
    } = objectUtils.allKeysWithValidData(req.body)

    if(!isValidValuesOnBody) {
        res.status(400).json({message: messageValidValuesOnKeys})
        return
    }
    next()
},addUserHttp)

router.put('/:id', upDateUserHttp)

router.get('/', getAllUserHttp)

module.exports.usersRouter = router