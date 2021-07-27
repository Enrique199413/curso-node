const mongoUnit = require('mongo-unit')
const expect = require('chai').expect
const allMockCollections = require('./../mock/dbCollection.json')
const chai = require('chai')
const assert = chai.assert
const errorCode = require('./../mock/errorCode')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const app = require('../../index')
const { response } = require('express')

let mongoUrl
let userController
(async (dbName) => {
    await mongoUnit.start({dbName})
    mongoUrl = mongoUnit.getUrl()
    console.log('Tu mongo', mongoUrl)
    run()

})('users')


// after(async () => {
//     console.log('Esto se ejecuta despues')
//     await mongoUnit.stop()
//
// })

describe('Suit for valid passport strategy', () => {

    /*before(() => {
        process.env.MONGO_DB_URI = mongoUrl
        userController = require('../../users/users.controller')
    })

    afterEach(() => {
        //console.log('afterEach')
        mongoUnit.drop()
    })

    beforeEach(() => {
        console.log('afterEach')
        mongoUnit.initDb(mongoUrl, allMockCollections)
    })*/

    it('Should by get error message, user no found', (done) => {
        chai.request(app)
          .post('/login')
            .send({username: 'RocioPrueba5e', lastName: 'HernanandezPrueba5'})
          .end((err, res) => {
            chai.assert.equal(res.statusCode, 404)
            done()
        })
    })


    it('Should by get error message, dont send lastname', (done) => {
        chai.request(app)
            .post('/login')
            .send({username: 'RocioPrueba5e'})
            .end((err, res) => {
                chai.assert.equal(res.text, "{\"message\":\"Please send username and lastName\"}")
                done()
            })
    })

    it('Should by get error message, dont send username', (done) => {
        chai.request(app)
            .post('/login')
            .send({lastName: 'RocioPrueba5e'})
            .end((err, res) => {
                chai.assert.equal(res.text, "{\"message\":\"Please send username and lastName\"}")
                done()
            })
    })

    it('Should by get JWT ok', (done) => {
        chai.request(app)
            .post('/login')
            .send({username: 'RocioPrueba5', lastName: 'HernanandezPrueba5'})
            .end((err, res) => {
                chai.assert.isNotNull(res.text)
                done()
            })
    })
})
