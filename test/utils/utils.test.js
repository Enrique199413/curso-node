const chai = require('chai')
const sinon = require('sinon')
const faker = require('faker')
const mocha = require('mocha')
const httpChai = require('chai-http')
const utils = require('../../utils/utils')



chai.use(httpChai)

describe('all test for utilities for valid CRUD mongo', () => {

    /**
     * Test for Verify function allKeysWithValidData
     */
    it('Should verify all key with data', (done) => {
        const body = {
            name: 'Rocio',
            lastName: 'Hernandez',
            surName: 'Hernandez'
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
            name: 'Rocio',
            lastName: '',
            surName: 'Hernandez'
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
            name: 'Rocio',
            lastName: 'Hernandez',
            surName: 'Hernandez'
        }
        const {message: mes,
            canContinue
        } = utils.objectUtils.existPropertiesOnObject(body, 'name', 'lastName', 'surName')

        chai.assert.isTrue(canContinue, 'Happy Path, properties exit on object')
        chai.assert.equal(mes,'ok', 'Ok message valid properties exist')
        done()
    })

    it('Should verify keys are not equal on object', (done) => {
        const body = {
            name: 'Rocio',
            lastName: 'Hernandez',
            surNAme: 'Hernandez'
        }
        const {message,
            canContinue
        } = utils.objectUtils.existPropertiesOnObject(body, 'name', 'lastName', 'surName')

        chai.assert.isFalse(canContinue, 'Propertie not exist on object')
        chai.assert.equal(message,'Keys are not equal', 'Ok message keys are not equal')
        done()
    })

    it('Should verify missing parameters', (done) => {
        const body = {
            name: 'Rocio',
            lastName: 'Hernandez'
        }
        const {message,
            canContinue
        } = utils.objectUtils.existPropertiesOnObject(body, 'name', 'lastName', 'surName')

        chai.assert.isFalse(canContinue, 'Propertie missing')
        chai.assert.equal(message, 'Missing parameters', 'Test for valid missing parameter')
        done()
    })

    it('Should verify exceeds parameters', (done) => {
        const body = {
            name: 'Rocio',
            lastName: 'Hernandez',
            surName: 'Hernandez',
            birthDate: ''
        }
        const {message,
            canContinue
        } = utils.objectUtils.existPropertiesOnObject(body, 'name', 'lastName', 'surName')

        chai.assert.isFalse(canContinue, 'Exceeds parameters')
        chai.assert.equal(message, 'Exceeds parameters', 'Test for valid exceed parameter')
        done()
    })

    it('Should verify without parameter ', (done) => {
        const body = {}
        const {message,
            canContinue
        } = utils.objectUtils.existPropertiesOnObject(body, 'name', 'lastName', 'surName')

        chai.assert.isFalse(canContinue, 'Body empty')
        chai.assert.equal(message, 'Missing parameters, empty', 'Test for valid body empty without parameter')
        done()
    })

    /**
     * Test for valid parameters for find user, verify function filterFinByParams
     */

    it('Should verify exist properties on object HP', (done) => {
        const params = {
            name: 'Rocio',
            lastName: 'Hernandez',
            surName: 'Hernandez'
        }
        const {filterContinue, data, message
        } = utils.objectUtils.filterFinByParams(params, 'name', 'lastName', 'surName')

        chai.assert.equal(message,'Parameter is valid name,lastName,surName', 'Test for valid all parameters exist on object')
        chai.assert.isTrue(filterContinue, 'Happy Path, all params exist with data')
        done()
    })

    it('Should verify params empty', (done) => {
        const params = {}
        const {filterContinue, data, message
        } = utils.objectUtils.filterFinByParams(params, 'name', 'lastName', 'surName')

        chai.assert.isFalse(filterContinue, 'Params dont found')
        chai.assert.equal(message,'Params not found', 'Test for valid all parameters exist on object')
        done()
    })

    it('Should verify only two params valid {name, lastname}', (done) => {
        const params = {
            name: 'Rocio',
            lastName: 'Hernandez',
        }
        const {filterContinue, data, message
        } = utils.objectUtils.filterFinByParams(params, 'name', 'lastName', 'surName')

        chai.assert.isTrue(filterContinue, 'Should verify only two params valid {name, lastname}')
        chai.assert.equal(message,'Parameter is valid name,lastName', 'Test for valid two of three parameters ')
        done()
    })

    it('Should verify only two params valid {name, surName}', (done) => {
        const params = {
            name: 'Rocio',
            surName: 'Hernandez',
        }
        const {filterContinue, data, message
        } = utils.objectUtils.filterFinByParams(params, 'name', 'lastName', 'surName')

        chai.assert.isTrue(filterContinue, 'Should verify only two params valid {name, surName}')
        chai.assert.equal(message,'Parameter is valid name,surName', 'Test for valid two of three parameters ')
        done()
    })

    it('Should verify only two params valid {lastname, surName}', (done) => {
        const params = {
            lastName: 'Hernandez',
            surName: 'Hernandez'
        }
        const {filterContinue, data, message
        } = utils.objectUtils.filterFinByParams(params, 'name', 'lastName', 'surName')

        chai.assert.isTrue(filterContinue, 'Should verify only two params valid {lastname, surName}')
        chai.assert.equal(message,'Parameter is valid lastName,surName', 'Test for valid two of three parameters ')
        done()
    })

    it('Should verify only two params valid {lastName, name} regardless of the order', (done) => {
        const params = {
            lastName: 'Rocio',
            name: 'Hernandez',
        }
        const {filterContinue, data, message
        } = utils.objectUtils.filterFinByParams(params, 'name', 'lastName', 'surName')

        chai.assert.isTrue(filterContinue, 'Should verify only two params valid {lastName, name} regardless of the order')
        chai.assert.equal(message,'Parameter is valid lastName,name', 'Test for valid two of three parameters ')
        done()
    })

    it('Should verify only two params valid {surName, name} regardless of the order', (done) => {
        const params = {
            surName: 'Hernandez',
            name: 'Hernandez'
        }
        const {filterContinue, data, message
        } = utils.objectUtils.filterFinByParams(params, 'name', 'lastName', 'surName')

        chai.assert.isTrue(filterContinue, 'Should verify only two params valid {surName, name}')
        chai.assert.equal(message,'Parameter is valid surName,name', 'Test for valid two of three parameters ')
        done()
    })

    it('Should verify only two params valid {surName, lastName} regardless of the order', (done) => {
        const params = {
            surName: 'Rocio',
            lastName: 'Hernandez',
        }
        const {filterContinue, data, message
        } = utils.objectUtils.filterFinByParams(params, 'name', 'lastName', 'surName')

        chai.assert.isTrue(filterContinue, 'Should verify only two params valid {surName, lastName} regardless of the order')
        chai.assert.equal(message,'Parameter is valid surName,lastName', 'Test for valid two of three parameters ')
        done()
    })

    it('Should verify only two params, one param invalid {nameIncorrect, lastname}', (done) => {
        const params = {
            nameIncorrect: 'Rocio',
            lastName: 'Hernandez',
        }
        const {filterContinue, data, message
        } = utils.objectUtils.filterFinByParams(params, 'name', 'lastName', 'surName')

        chai.assert.isFalse(filterContinue, 'Should verify only two params, one param invalid  {nameIncorrect, lastname}')
        chai.assert.equal(message,'the params is not valid nameIncorrect', 'Test for valid two of three parameters ')
        done()
    })

    it('Should verify only one param valid {name}', (done) => {
        const params = {
            name: 'Rocio'
        }
        const {filterContinue, data, message
        } = utils.objectUtils.filterFinByParams(params, 'name', 'lastName', 'surName')

        chai.assert.isTrue(filterContinue, 'Should verify only one param valid {name}')
        chai.assert.equal(message,'Parameter is valid name', 'Test for valid two of three parameters ')
        done()
    })

    it('Should verify only one param invalid {otherParam}', (done) => {
        const params = {
            otherParam: 'Rocio'
        }
        const {filterContinue, data, message
        } = utils.objectUtils.filterFinByParams(params, 'name', 'lastName', 'surName')

        chai.assert.isFalse(filterContinue, 'Should verify only one param invalid')
        chai.assert.equal(message,'the params is not valid otherParam', 'Test for valid two of three parameters ')
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