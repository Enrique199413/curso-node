const chai = require('chai')
const httpChai = require('chai-http')
const utils = require('../utils/utils')



chai.use(httpChai)

describe('test for utilities mongo', () => {

    it('Should verify all key with data', (done) => {
        const data = {
            name: 'Rafael',
            lastName: 'Ayala',
            surName: 'Millán'
        }
        const {message: messageValidValuesOnKeys,
            canContinue: isValidValuesOnBody
        } = utils.objectUtils.allKeysWithValidData(data)

        chai.assert.isTrue(isValidValuesOnBody)
        chai.assert.equal(messageValidValuesOnKeys, 'All values on keys are valid')
        done()
    })

    it('Should verify all key without data valid', (done) => {
        const data = {
            name: 'Rafael',
            lastName: '',
            surName: 'Ayala'
        }
        const {message: messageValidValuesOnKeys,
            canContinue: isValidValuesOnBody
        } = utils.objectUtils.allKeysWithValidData(data)

        chai.assert.isFalse(isValidValuesOnBody , 'Keys whitout data valid')
        chai.assert.equal(messageValidValuesOnKeys, 'Verify values on keys')
        done()
    })

    it('Should verify missing parameters', (done) => {
        const data = {
            name: 'Rafael',
            lastName: 'Ayala'
        }
        const {message,
            canContinue
        } = utils.objectUtils.existPropertiesOnObject(data, 'name', 'lastName', 'surName')

        chai.assert.isFalse(canContinue)
        chai.assert.equal(message, 'Missing parameters')
        done()
    })

    it('Should verify Exceeds parameters', (done) => {
        const data = {
            name: 'Rafael',
            lastName: 'Ayala',
            surName: 'Millán',
            otro: 'otro'
        }
        const {message,
            canContinue
        } = utils.objectUtils.existPropertiesOnObject(data, 'name', 'lastName', 'surName')

        chai.assert.isFalse(canContinue)
        chai.assert.equal(message, 'Exceeds parameters')
        done()
    })

    it('Should verify Keys are not equal', (done) => {
        const data = {
            name: 'Rafael',
            lastName: 'Ayala',
            sulName: 'Millán'
        }
        const {message,
            canContinue
        } = utils.objectUtils.existPropertiesOnObject(data, 'name', 'lastName', 'surName')

        chai.assert.isFalse(canContinue)
        chai.assert.equal(message, 'Keys are not equal')
        done()
    })

    it('Should verify all Keys valid', (done) => {
        const data = {
            name: 'Rafael',
            lastName: 'Ayala',
            surName: 'Millán'
        }
        const {message,
            canContinue
        } = utils.objectUtils.existPropertiesOnObject(data, 'name', 'lastName', 'surName')

        chai.assert.isTrue(canContinue)
        chai.assert.equal(message, 'ok')
        done()
    })

})