const { userUtils } = require('../utils/user.utils')

const validatePropertiesOnObject = (req, res, next) => {
    const {
        message: validstructure,
        canContinue: isValidBody
    } = userUtils(req.body, 'username', 'password')

    if (!isValidBody) {
        res.status(400).json({ message: validstructure })
        return
    }

    next()
}

module.exports = validatePropertiesOnObject