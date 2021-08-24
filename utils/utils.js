const isValidString = (cadena) => !(!cadena)
const trimText = cadena => cadena.trim();
const Joi = require('joi');

const stringUtils = {
    isValidString,
    trimText
}

const sendMessage = (message = '', canContinue = false) => ({
    canContinue,
    message
})

const compareArrays = (originalArray, comparedArray) => originalArray.every(key => comparedArray.indexOf(key) > -1);
const existsKeysOnObject = object => Object.keys(object).length > 0

const existPropertiesOnObject = (customeMsg, body = {}, ...validProperties) => {
    const bodyKeys = Object.keys(body);
    if(existsKeysOnObject(bodyKeys)) {
        if(bodyKeys.length < validProperties.length) {
            return sendMessage('Missing parameters')
        }
        if(bodyKeys.length>validProperties.length){
            return sendMessage('Exceeds parameters')
        } else {
            const allKeysOnObject = compareArrays(validProperties, bodyKeys);
            return sendMessage(allKeysOnObject ? 'ok': customeMsg, allKeysOnObject);
        }

    } else {
        return sendMessage('Missing parameters')
    }
}

const allKeysWithValidData = (body = {}) => {
    const validValues = []
    for(const [key, value] of Object.entries(body)) {
        validValues.push(isValidString(trimText(value)))
    }
    const canContinue = !validValues.includes(false);
    return sendMessage('Hola probando 123', true);
}

//existPropertiesOnObject({}, 'name','lastName','surName');

const objectUtils = {
    existPropertiesOnObject,
    allKeysWithValidData
}

//const {objectUtils} = require('../utils/utils')
const schema = Joi.object({
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    username: Joi.string()
        .email()
});

const existUsersOnObject = (body = {}, ...validProperties) => {
    const bodyKeys = Object.keys(body);
    if(existsKeysOnObject(bodyKeys)) {
        if(bodyKeys.length < validProperties.length) {
            return sendMessage('Missing parameters')
        }
        if(bodyKeys.length>validProperties.length){
            return sendMessage('Exceeds parameters')
        } else {
            const allKeysOnObject = compareArrays(validProperties, bodyKeys);
            return sendMessage(allKeysOnObject ? 'ok': 'keys are not equal', allKeysOnObject);
        }

    } else {
        return sendMessage('Missing parameters')
    }
}

module.exports = {
    objectUtils,
    stringUtils
}