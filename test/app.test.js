const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const app = require('../app.js')
const mocks = require('./mocks.js')

describe('Testing /hola-mundo', () => {
  it(`'GET /hola-mundo' should return greeting`, () => {
    chai.request(app)
    .get('/hola-mundo')
    .end((err, res) => {
      chai.assert.equal(res.text, 'Hola mundo :D')
    }) 
  })
})

describe('Testing /suma', () => {
  it(`'GET /suma?a=number&b=number' should return a+b correct result`, () => {
    const a = 1, b = 2
    chai.request(app)
    .get('/suma')
    .query({a, b})
    .end((err, res) => {
      chai.assert.equal(res.text, `suma: ${a + b}`)
    })
  })

  it(`'GET /suma?a=NaN&b=number' should return error response`, () => {
    const a = 'uno', b = 2
    chai.request(app)
    .get('/suma')
    .query({a, b})
    .end((err, res) => {
      chai.assert.deepEqual(res.body, mocks.invalidParamsError(a,b))
    })
  })

  it(`'GET /suma?a=number&b=NaN' should return error response`, () => {
    const a = 1, b = 'dos'
    chai.request(app)
    .get('/suma')
    .query({a, b})
    .end((err, res) => {
      chai.assert.deepEqual(res.body, mocks.invalidParamsError(a,b))
    })
  })
})
