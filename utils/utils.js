require('dotenv').config()
const AIRTABLE_API_KEY = process.env['AIRTABLE_API_KEY']
const fetchDefaultOptions = {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`
    }
}

const isValidString = string => !!string
const trimText = string => string.trim()
/*const isValidString = (string) => {
    return !(!string)
}
// const isValidString = string => !(!string)  // TODO simplificar
// const isValidString = string => !!string  // TODO simplificar*/

const stringUtils = {
    isValidString,
    trimText
}

const sendMessage = (message = '', canContinue = false) => ({
    canContinue,
    message
})

const compareArrays = (originalArray, comparedArray) => originalArray.every(key => comparedArray.indexOf(key) > -1)
const existsKeysOnObject = object => Object.keys(object).length > 0

const existPropertiesOnObject = (body = {}, ...validProperties) => {
    const bodyKeys = Object.keys(body)
    if (existsKeysOnObject(bodyKeys)) {
        if (bodyKeys.length > validProperties.length) {
            return sendMessage('Exceeds parameters')
        } else if (bodyKeys.length < validProperties.length) {
            return sendMessage('Missing parameters')
        } else {
            console.log(bodyKeys, validProperties)
            const allKeysOnObject = compareArrays(validProperties, bodyKeys)
            return sendMessage(allKeysOnObject ? 'ok' : 'Keys are not equal', allKeysOnObject)
        }
    } else {
        return sendMessage('Missing parameters')
    }
}

const allKeysWithValidData = (body = {}) => {
    /*Object.keys(body).forEach(key => {
        console.log(key, body[key])
    })*/
    const validValues = []
    for (const [key, value] of Object.entries(body)) {
        //console.log(key, value)
        validValues.push(isValidString(trimText(value)))

    }
    const canContinue = !validValues.includes(false)

    return sendMessage(canContinue ? 'All values on keys are valid' : 'verify values on keys', canContinue)
}

existPropertiesOnObject({}, 'name', 'lastName', 'surName')

const filterFinByParams = (params = {}, ...validProperties) => {
    console.log('dfbfdbvdbvbf')
    console.log('params', params)
    console.log('validProperties', validProperties)
    const paramsKeys = Object.keys(params)

    if (existsKeysOnObject(paramsKeys)) {
        /*
        v1: crear una funcion para validar los params para consular, conforme la entrada
         una key valida
           dos key validas
           tres key validas
           validas con mas parametros
         */


        const allKeysOnObject = compareArrays(validProperties, paramsKeys)
        console.log(allKeysOnObject)
        return filterStatus({}, allKeysOnObject)

    } else {
        return filterStatus({}, false)
    }

}
const filterStatus = (data = {}, filterContinue = false) => ({
    filterContinue,
    data
})

const objectUtils = {
    existPropertiesOnObject,
    allKeysWithValidData,
    filterFinByParams
}
    // arreglo = ['name', 'lastname', 'surname']
    // 1 body {} -- mensaje de error assigning properties
    // 2 body {name: undefined} -- mensaje de error missing properties
    // 3 body {cumplir con cada uno} -- ok
    // 4 body {se pasó en alguna key} -- mensaje de error excede propiedades



module.exports = fetchDefaultOptions
module.exports = {
    objectUtils,
    stringUtils,
    allKeysWithValidData
}

/*
// funcion pura que recibe dinamismo, y que siempre retorna lo mismo
const funcion = (a, b) => {
    return a+ b
}*/
