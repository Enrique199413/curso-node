const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon')
const faker = require('faker')
const mocha = require('mocha')
const utils = require('../utils')

chai.use(chaiHttp);

describe('Test utils', () => {
    it('Equal object', (done) => {
        const data = ({}, 'name', 'lastName', 'surName')
        chai.expect(utils.objectUtils.existPropertiesOnObject).to.equal(data)
        done()
    })






})