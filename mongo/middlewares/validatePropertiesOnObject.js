const { objectUtils } = require('../utils/utils')

const validatePropertiesOnObject = (req,res,next) =>{
    const {
        message: validstructure,
        canContinue: isValidBody
    } = objectUtils.existPropertiesOnObject(req.body, 'name', 'lastName', 'surName')

    if (!isValidBody) {
        res.status(400).json({message: validstructure})
        return
    }

    const {
        message: messageValidValuesOnKeys,
        canContinue: isValidValuesBody
    } = objectUtils.allKeysWithValidData(req.body)

    if (!isValidValuesBody) {
        res.status(400).json({message: messageValidValuesOnKeys})
        return
    }

    next()
}

module.exports = validatePropertiesOnObject