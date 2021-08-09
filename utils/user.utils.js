const sendMessage = (message = '', canContinue = false) => ({
    canContinue,
    message
})

const compareArrays = (originalArray, comparedArray) => originalArray.every(key => comparedArray.indexOf(key) > -1)
const existsKeysOnObject = object => Object.keys(object).length > 0

const userUtils = (body = {}, ...validProperties) => {
    const bodyKeys = Object.keys(body)
    if (existsKeysOnObject(bodyKeys) && bodyKeys.length >= validProperties.length) {
        if (bodyKeys.length > validProperties.length) {
            return sendMessage('Exceeds parameters')
        } else {
            const allKeysOnObject = compareArrays(bodyKeys, validProperties)
            return sendMessage(allKeysOnObject ? 'ok' : 'Keys are not equal', allKeysOnObject)
        }
    } else {
        return sendMessage('Please add username and passwords')
    }
}
userUtils({},
    'username',
    'password')

module.exports = {
    userUtils
}