const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon')
const faker = require('faker')
const mocha = require('mocha')
const utils = require('../utils')

chai.use(chaiHttp);

describe('Test utils', () => {
    it('Continue success', (done) => {
        const data = { name: "name", lastName: "lasName", surName: "surName" }
        const { canContinue } = utils.objectUtils.existPropertiesOnObject(data, 'name', 'lastName', 'surName')
        chai.expect(canContinue).to.be.true;
        done()
    })

    it('Correct length', (done) => {
        const data = { Name: "name", LastName: "lastName", SurName: "surName" }
        chai.expect(Object.keys(data)).to.have.lengthOf(3)
        done()
    })

    it('Incorrect length', (done) => {
        const data = { Name: "name", LastName: "lastName" }
        chai.expect(data.length < data.length).to.be.false
        done()
    })

    it('Not empty', (done) => {
        const data = {}
        chai.expect(data).to.be.empty;
        done()
    })

    it('Equal keys', (done) => {
        const data = { name: "name", lastName: "lastName", surName: "surName" }
        chai.expect(data).to.include.all.keys('name', 'lastName', 'surName');
        done()
    })

})