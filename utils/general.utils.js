
const isValidString = string => !!string
const trimText = string => string.trim()

const existsKeysOnObject = object => Object.keys(object).length > 0

const sendMessage = (message = '', canContinue = false) => ({
    canContinue,
    message
})
const compareArrays = (originalArray, comparedArray) => originalArray.every(key => comparedArray.indexOf(key) > -1)

/**
 * Only valid properties necesaries
 */
const existPropertiesOnObject = (body = {}, ...validProperties) => {
    const bodyKeys = Object.keys(body)
    const allKeysOnObject = compareArrays(validProperties, bodyKeys)
    console.log(validProperties, bodyKeys)
    if (existsKeysOnObject(bodyKeys) && allKeysOnObject) {
        return sendMessage('OK params', true)

    } else {
        return sendMessage('Missing parameters, empty')
    }
}

/**
 * Valid keys of body with data
 */
const allKeysWithValidData = (body = {}) => {
    const validValues = []
    for (const [key, value] of Object.entries(body)) {
        validValues.push(isValidString(trimText(value)))
    }
    const canContinue = !validValues.includes(false)

    return sendMessage(canContinue ? 'All values on keys are valid' : 'verify values on keys', canContinue)
}

const stringUtils = {
    isValidString,
    trimText
}

const objectUtils = {
    existPropertiesOnObject,
    allKeysWithValidData
}

module.exports = {
    objectUtils,
    stringUtils
}
