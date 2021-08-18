const chai = require('chai')
const chaiHttp = require('chai-http')
const errorCode = require('./mock/errorCodes')
const assert = chai.assert
chai.use(chaiHttp)

/* Intsancia de aplicacion */
const app = require('../app1')

describe('Suite test get method', () => {
    /*it('Expecting sum will be 2 from 1+1', () => {
        assert.equal(1+1, 2)
    })*/

    it('Should send queryPArams and get sum from a and b', () => {
        const a = 10
        const b = 10
        chai.request(app)
        .get('/hola-mundo/suma')
        .query({
            a,
            b
        })
        .end((err, response) => {
            console.log("Aqui")
            console.log(response.text)
            const responseNumber = response.text
            assert.equal(responseNumber, `La suma de 10 + 10 es 20`)
        })
    })

    it('Should be send queryParams and get sum from -a and -b', () => {
        const a =-1
        const b =-1
        chai.request(app)
        .get('/hola-mundo/suma')
        .query({
            a,b
        })
        .end((err, response)=> {
            const responseNumber = response.text
            assert.equal(responseNumber, `La suma de -1 + -1 es -2`)
        })
    })

    it('Should be send queryParams and get sum from a(String) and b(String)', () => {
        const a = 'cien'
        const b = 'veinticinco'
        chai.request(app)
        .get('/hola-mundo/suma')
        .query({
            a,b
        })
        .end((err, response)=> {
            const responseNumber = response.body
            assert.deepEqual(responseNumber, errorCode.errorWhenIsNotNumeric(a,b))
        })
    })
})

describe('Testing getAirTable endpoint', ()=> {
    it('When environment not exists', () => {
        chai.request(app)
        .get('/getAirTableUsers')
        .end((err, response)=> {
            assert.equal(response.status, 401);
            assert.deepEqual(response.text, errorCode.errorWhenEnvironmentNotExist);
        })
    })

    it('When environment exists', (done) => {
        process.env.AIRTABLE_APIKEY_MAC = 'keyOpLpYB2gbKJzWa'
        chai.request(app)
        .get('/getAirTableUsers')
        .end((err, response)=> {
            console.log(response.text)
            assert.equal(response.status, 200);
            assert.deepEqual(response.text, '');
            done();
        })
    })
})