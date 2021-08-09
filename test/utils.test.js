const chai = require('chai')
const httpChai = require('chai-http')
const utils = require('../utils/general.utils')
chai.use(httpChai)

describe('all test for utilities for valid CRUD register, favorites, spaces, login', () => {

    /**
     * Test for Verify function allKeysWithValidData
     */
    it('Should verify all key with data', (done) => {
        const body = {
            username: 'roci',
            password: 'password'
        }
        const {message: messageValidValuesOnKeys,
            canContinue: isValidValuesOnBody
        } = utils.objectUtils.allKeysWithValidData(body)

        chai.assert.isTrue(isValidValuesOnBody, 'Keys whit data valid')
        chai.assert.equal(messageValidValuesOnKeys, 'All values on keys are valid', 'Ok message keys valid')
        done()
    })

    it('Should verify all key without data valid', (done) => {
        const body = {
            username: 'Rocio',
            password: ''
        }
        const {message: messageValidValuesOnKeys,
            canContinue: isValidValuesOnBody
        } = utils.objectUtils.allKeysWithValidData(body)

        chai.assert.isFalse(isValidValuesOnBody , 'Keys whitout data valid')
        chai.assert.equal(messageValidValuesOnKeys, 'verify values on keys', 'Ok message keys valid')
        done()
    })

    /**
     * Test for valid properties, verify function existPropertiesOnObject
     */
    it('Should verify exist properties on object HP', (done) => {
        const body = {
            username: 'Rocio',
            password: 'password'
        }
        const {message,
            canContinue
        } = utils.objectUtils.existPropertiesOnObject(body, 'username', 'password')

        console.log(message, canContinue, )

        chai.assert.isTrue(canContinue, 'Happy Path, properties exit on object')
        chai.assert.equal(message,'OK params', 'Ok message valid properties exist')
        done()
    })

    it('Should verify keys are not equal on object', (done) => {
        const body = {
            username: 'Rocio',
            Passwors: 'password'
        }
        const {message,
            canContinue
        } = utils.objectUtils.existPropertiesOnObject(body, 'username', 'password')

        chai.assert.isFalse(canContinue, 'Propertie not exist on object')
        chai.assert.equal(message,'Missing parameters, empty', 'Ok message keys are not equal')
        done()
    })

    it('Should verify missing parameters', (done) => {
        const body = {
            username: 'Rocio'
        }
        const {message,
            canContinue
        } = utils.objectUtils.existPropertiesOnObject(body, 'username', 'password')

        chai.assert.isFalse(canContinue, 'Propertie missing')
        chai.assert.equal(message, 'Missing parameters, empty', 'Test for valid missing parameter')
        done()
    })


    it('Should verify without parameter ', (done) => {
        const body = {}
        const {message,
            canContinue
        } = utils.objectUtils.existPropertiesOnObject(body, 'username', 'password')

        chai.assert.isFalse(canContinue, 'Body empty')
        chai.assert.equal(message, 'Missing parameters, empty', 'Test for valid body empty without parameter')
        done()
    })


    /**
     * Test for function isValidString
     */
    it('Should verify function isValidString, for valid string', (done) => {
        const isValidString= utils.stringUtils.isValidString('name ok')

        chai.assert.isTrue(isValidString, 'Should verify name ok is string')
        done()
    })

    it('Should verify function isValidString, for valid string empty', (done) => {
        const isValidString= utils.stringUtils.isValidString('')

        chai.assert.isFalse(isValidString, 'Should verify string empty')
        done()
    })

    it('Should verify function trimText, for remove space', (done) => {
        const stringClean = '        '
        const trimText= utils.stringUtils.trimText(stringClean)

        chai.assert.equal(trimText, '','Should verify clean de space')
        done()
    })

    it('Should verify function trimText, for remove space', (done) => {
        const stringClean = 'Rocio Hernandez  '
        const trimText= utils.stringUtils.trimText(stringClean)

        chai.assert.equal(trimText, 'Rocio Hernandez','Should verify clean de space')
        done()
    })

})