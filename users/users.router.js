const router = require('express').Router();
const {addUserHttp, getAllUsersHttp, updUserHttp, delUserHttp} = require('./users.http');
const {objectUtils} = require('../utils/utils')

router.post('/', (req, res, next) => {
    const {
        message : messageValidObjectStructure,
        canContinue: isValidBody
    } = objectUtils.existPropertiesOnObject(req.body, 'name', 'lastName', 'surName');
    if(!isValidBody) {
        res.status(400).json({message: messageValidObjectStructure})
        return
    }
    
    const {
        message : messageValidValuesOnKeys,
        canContinue: isValidValuesOnBody
    } = objectUtils.allKeysWithValidData(req.body)

    if(!isValidValuesOnBody) {
        res.status(400).json({message: messageValidValuesOnKeys})
    }
    
    next()
}, addUserHttp)
//Updating
router.put('/:id', (req, res, next) => {
    const {
        message : messageValidObjectStructure,
        canContinue: isValidBody
    } = objectUtils.existPropertiesOnObject(req.body, 'name', 'lastName', 'surName');
    if(!isValidBody) {
        res.status(400).json({message: messageValidObjectStructure})
        return
    }
    
    const {
        message : messageValidValuesOnKeys,
        canContinue: isValidValuesOnBody
    } = objectUtils.allKeysWithValidData(req.body)

    if(!isValidValuesOnBody) {
        res.status(400).json({message: messageValidValuesOnKeys})
    }
    next()
}, updUserHttp)
//
router.get('/', getAllUsersHttp)
router.delete('/:id', delUserHttp)

module.exports.usersRouter = router;