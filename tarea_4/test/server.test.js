const chai = require('chai');
const sinon = require('sinon')
const faker = require('faker')
const mocha = require('mocha')
const chaiHttp = require('chai-http')
const userController = require('../controllers/userController').User

chai.use(chaiHttp);

describe('all test for faker', () => {
    it('check info from airtable', (done) => {
        const mockData = {
            count: 100,
            data: [
                {
                    id: faker.random.uuid(),
                    fields: {
                        "Name": faker.name.findName(),
                        "Cliente": faker.name.findName() + 'S.A. de C.V.',
                        "4letras": faker.finance.currencyCode(),
                        "Apellido": faker.name.findName(),
                        "CorreoGFT": faker.internet.email()
                    },
                    createdTime: "2021-06-21T17:49:35.000Z"
                }
            ]
        }
        const stubData = sinon.stub(userController, 'readUser').returns(mockData)
        const readMockData = userController.readUser(100)

        chai.expect(stubData.calledOnce).to.be.true;
        chai.expect(readMockData.data[0].id).to.equal(mockData.data[0].id)
        chai.assert.deepEqual(readMockData.data[0], mockData.data[0])
        chai.expect(readMockData.count).to.equal(100)

        console.log(readMockData)
        done()
        // chai.request(app).get('/users/all').end((err, response) => {
        //     console.log(response)
        //     done()
        // })
    })
})