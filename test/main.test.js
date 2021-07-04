const chai = require('chai')
const sinon = require('sinon')
const faker = require('faker')
const mocha = require('mocha')
const httpChai = require('chai-http')
const app = require('../index')

const userController = require('../controllers/userController').User

chai.use(httpChai)

describe('all test for faker', () => {

    it('firs test faker one, check into from airtable', () => {
        const mockData ={
            count: 1,
            data: [
                {
                    id: "recIZasCc4q7zlykJ",
                    fields: {
                        "Name": "Enrique",
                        "Cliente": "BBVA",
                        "4letras": "ENLC",
                        "Apellido": "López",
                        "PersonasLenguajes": [
                            "recWP9cmqy1uALzDm"
                        ]
                    },
                    "createdTime": "2021-06-21T17:49:35.000Z"
                },
            ]
        }

    })

    it('check into from airtable', () => {

        const mockData ={
            count: 1,
            data: [
                {
                    "id": faker.random.uuid(),
                    "fields": {
                        "Name": faker.name.findName(),
                        "Cliente": faker.name.findName(),
                        "4letras": faker.finance.currencyCode(),
                        "Apellido": faker.name.findName(),
                        "CorreoGFT": faker.internet.email()
                    },
                    "createdTime": "2021-06-21T17:49:35.000Z"
                }
            ]
        }

        const stubData = sinon.stub(userController, 'readUser').return(mockData)

        const readMockData = userController.readUser()

        chai.expect(stubData.calledOnce).to.be.true
        chai.expect(readMockData.data[0].id).to.equal(mockData.data[0].id)


        chai.request(app).get('').end((err,response) => {
            console.log(response)
            done()
        })
    })
})

