const chai = require('chai')
const assert = chai.assert
const errorCode = require('./mock/errorCodes')
const chaiHttp = require('chai-http')
//const { response } = require('express')
chai.use(chaiHttp)
const sinon =  require('sinon')
const faker = require('faker')
const mocha = require('mocha')
const httpChai = require('chai-http')
const userController = require('../controllers/userController').User

const app = require('../app')
chai.use(httpChai)


describe('Suite test get method', () => {
    it('Should be send querryParams and get sum from a and b', () => {
       // assert.equal(1+1,2)
       const a = 10
       const b = 10
       chai.request(app)
       .get('/hola-mundo/suma')
       .query({
           a,
           b
       })
       .end((err,response) => {
           const responseNumber = response.text
           assert.equal(responseNumber,`La suma de ${a} + ${b} es ${a+b}`);
       })
    })
    it('Should be send querryParams and get sum from -a and -b', () => {
        const a = -1
        const b = -1
        chai.request(app)
        .get('/hola-mundo/suma')
        .query({
            a,
            b
        })
        .end((err,response) => {
            const responseNumber = response.text
            assert.equal(responseNumber,`La suma de ${a} + ${b} es ${a+b}`);
        })
     })
     it('Should be send querryParams and get sum from a and b are string', () => {
        const a = 'ana'
        const b = 'luis'
        chai.request(app)
        .get('/hola-mundo/suma')
        .query({
            a,
            b
        })
        .end((err,response) => {
            const responseNumber = response.body
            assert.deepEqual(responseNumber,errorCode.errorWhenIsNotNumeric(a,b));
        })
     })
})

describe('Test on getAirtableUsers', () => {
    it('if enviroment variable api key not exist', () => {
        chai.request(app)
            .get('/getAirtableUsers')
            .end((error, response) => {
                assert.equal(response.status, 401)
                assert.deepEqual(response.text, errorCode.errorWhenEnviomentNotExist)
       })
    })
    it('if enviroment variable api key not exist', (done) => {
        process.env.AIRTABLE_APIKEY = ''
        chai.request(app)
            .get('/getAirtableUsers')
            .end((error, response) => {
               // assert.deepEqual(response.text, '')
                done()
       })
    })
})


describe('all test for faker', () => {
    it('check info from airtable', (done) => {
        //STUBS
        const mockData = {
            count: 1,
            data: [
                {
                    id: faker.random.uuid(),
                    fields: {
                        "Name": faker.name.findName(),
                        "Cliente": faker.name.findName() + 'S.A. de C.V',
                        "4letras": faker.finance.currencyCode(),
                        "Apellido": faker.name.findName(),
                        "CorreoGFT": faker.internet.email()
                    },
                    createdTime: "2021-06-21T17:49:35.000Z"
                }
            ]
        }
        const stubData = sinon.stub(userController, 'readUser').returns(mockData)
        const readMockData = userController.readUser()

        chai.expect(stubData.calledOnce).to.be.true;
        chai.expect(readMockData.data[0].id).to.equal(mockData.data[0].id)
        chai.assert.deepEqual(readMockData.data[0], mockData.data[0])
        chai.expect(readMockData.count).to.equal(1)
        console.log(readMockData)
        done()
        /*
        const stubData = sinon.stub(userController, 'readUser').returns(mockData)
        chai.request(app).get('/users/all').end((response) => {
            console.log(response)
            done()
        })
        */
    })
})
