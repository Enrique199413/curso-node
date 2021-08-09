
const mongoUnit = require('mongo-unit')
const expect = require('chai').expect
const allMockCollections = require('./mock/dbCollection.json')
const chai = require('chai')
const assert = chai.assert
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const app = require('./../index')
const { response } = require('express')
// usuario agregado
let usernameNew = ''
let mongoUrl
let userController
(async (dbName) => {
    await mongoUnit.start({dbName})
    mongoUrl = mongoUnit.getUrl()
    console.log('mi  mongo fake', mongoUrl)
    run()

})('users')


after(async () => {
    console.log('Esto se ejecuta despues')
    await mongoUnit.stop()

})

describe('Suit for valid JWT authenticate, (LOGIN / USERS)', () => {

    before(() => {
        console.log('monurl', mongoUrl)
        process.env.MONGO_DB_URI = mongoUrl
        userController = require('../users/users.controller')
    })

    afterEach(() => {
        //console.log('afterEach')
        mongoUnit.drop()
    })

    beforeEach(() => {
        console.log('afterEach')
        //console.log(mongoUrl, allMockCollections)
        mongoUnit.initDb(mongoUrl, allMockCollections)
    })

    it('Should by get error message, user no found - LOGIN', (done) => {
        chai.request(app)
          .post('/api/login/')
            .send({username: 'RocioPrueba5e', password: '12345'})
          .end((err, res) => {
            chai.assert.equal(res.statusCode, 404)
            done()
        }).timeout(6000)
    })


    it('Should by get error message, dont send lastname - LOGIN', (done) => {
        chai.request(app)
            .post('/api/login/')
            .send({username: 'RocioPrueba5e'})
            .end((err, res) => {
                chai.assert.equal(res.text, "{\"message\":\"Please send username and password\"}")
                done()
            })
    })

    it('Should by get error message, dont send username - LOGIN', (done) => {
        chai.request(app)
            .post('/api/login/')
            .send({password: 'passwordOnly'})
            .end((err, res) => {
                chai.assert.equal(res.text, "{\"message\":\"Please send username and password\"}")
                done()
            })
    })

    it('Should by get JWT ok - LOGIN', (done) => {
        chai.request(app)
            .post('/api/login/')
            .send({username: 'nombre4', password: 'password'})
            .end((err, res) => {
                console.log(res.text)
                chai.assert.isNotNull(res.text)
                done()
            })
    })

    it('Should be get user whithout token - without JWT ', (done) => {
        chai.request(app)
            .get('/api/register/')
            .end((err, res) => {
                //console.log(res.statusCode)
                chai.assert.equal(res.statusCode, 401)
                done() 
            })
    })

    it('Should be get list of user register whit token OK - JWT OK', (done) => {
        chai.request(app)
            .post('/api/login/')
            .send({username: 'nombre4', password: 'password'})
            .end((err, resLogin) => {
                //console.log(resLogin)
                const token = JSON.parse(resLogin.text).token
                console.log('token login', token)
                chai.request(app)
                    .get('/api/register/')
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        console.log(res.statusCode)
                        chai.assert.equal(res.statusCode, 200)
                        done() 
                    })
            })


    })

    it('Should be get error to add user exist . JWT OK', (done) => {
        chai.request(app)
            .post('/api/login/')
            .send({username: 'nombre4', password: 'password'})
            .end((err, resLogin) => {
                //console.log(resLogin)
                const token = JSON.parse(resLogin.text).token
                console.log('token login', token)
                chai.request(app)
                    .post('/api/register/')
                    .send({username: 'nombre4', password: 'password'})
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        console.log(res.text, '--------------')
                        chai.assert.equal(JSON.parse(res.text).message, 'Username exist please login')
                        done() 
                    })
            })


    })

    it.skip('Should be add user new . JWT OK', (done) => {
        usernameNew = 'nombreRandom' + generateRandomInt(25)
        console.log(usernameNew, 'pppp')
        chai.request(app)
            .post('/api/login/')
            .send({username: 'nombre4', password: 'password'})
            .end((err, resLogin) => {
                const token = JSON.parse(resLogin.text).token

                chai.request(app)
                    .post('/api/register/')
                    .send({username: usernameNew , password: 'password'})
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200)
                        done() 
                    })
            })


    })
    function generateRandomInt(max){
        return Math.floor(Math.random() * max);
    }

    it('Should be get error body incomplet (without password) JWT OK', (done) => {
        chai.request(app)
            .post('/api/login/')
            .send({username: 'nombre4', password: 'password'})
            .end((err, resLogin) => {
                const token = JSON.parse(resLogin.text).token
                chai.request(app)
                    .post('/api/register/')
                    .send({username: 'nombre5'})
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        console.log(res.text)
                        chai.assert.equal(res.statusCode, 400)
                        chai.assert.equal(JSON.parse(res.text).message, 'Missing parameters, empty')
                        done() 
                    })
            })


    })

    it('Should be get error body incomplet (with password empty) JWT OK', (done) => {
        chai.request(app)
            .post('/api/login/')
            .send({username: 'nombre4', password: 'password'})
            .end((err, resLogin) => {
                const token = JSON.parse(resLogin.text).token
                chai.request(app)
                    .post('/api/register/')
                    .send({username: 'nombre5', password: ''})
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        console.log(res.text)
                        chai.assert.equal(res.statusCode, 400)
                        chai.assert.equal(JSON.parse(res.text).message, 'verify values on keys')
                        done() 
                    })
            })


    })

})


describe('Suit for Spaces, (LOGIN / spaces)', () => {

    before(() => {
        console.log('monurl', mongoUrl)
        process.env.MONGO_DB_URI = mongoUrl
        userController = require('../users/users.controller')

    })

    afterEach(() => {
        //console.log('afterEach')
        mongoUnit.drop()
    })

    beforeEach(() => {
        console.log('afterEach')
        //console.log(mongoUrl, allMockCollections)
        mongoUnit.initDb(mongoUrl, allMockCollections)
    })

    it('Should be get list spaces -  JWT OK', async (done) => {
        // const lastUser = await userController.getByUsernamePassword({username: usernameNew, password: password})
        // console.log('lasr user', lastUser)

        chai.request(app)
            .post('/api/login/')
            .send({username: 'nombre4', password: 'password'})
            .end((err, resLogin) => {
                const token = JSON.parse(resLogin.text).token
                chai.request(app)
                    .get('/api/spaces/')
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200)
                        done() 
                    })
            })


    })
    it('Should be get error unauthorized - Unauthorized JWT ', (done) => {
        chai.request(app)
            .post('/api/login/')
            .send({username: 'nombrsfdsfsefe4', password: 'password'})
            .end((err, resLogin) => {
                const token = JSON.parse(resLogin.text).token
                chai.request(app)
                    .get('/api/spaces/')
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 401)
                        done() 
                    })
            })


    })
})

describe('Suit for Favorites, (LOGIN / favorites)', () => {

    before(() => {
        process.env.MONGO_DB_URI = mongoUrl
    })

    afterEach(() => {
        //console.log('afterEach')
        mongoUnit.drop()
    })

    beforeEach(() => {
        mongoUnit.initDb(mongoUrl, allMockCollections)
    })

    it('Should be get unathorized, post favorites -  without JWT', (done) => {
        chai.request(app)
            .post('/api/login/')
            .send({username: 'nombre4not exist', password: 'password'})
            .end((err, resLogin) => {
                const token = JSON.parse(resLogin.text).token
                chai.request(app)
                    .post('/api/favorites/')
                    .send({ "userId": "61107b8954ee8bb201b13ffe",
                        "spaceId": "6102b4812254e2b2f535b187"})
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 401)
                        done() 
                    })
            })


    })

    it('Should be get error post favorites, params incomplete - JWT OK', (done) => {
        chai.request(app)
            .post('/api/login/')
            .send({username: 'nombre4', password: 'password'})
            .end((err, resLogin) => {
                console.log('token post favorites,', resLogin.text)
                const token = JSON.parse(resLogin.text).token
                chai.request(app)
                    .get('/api/favorites/')
                    .send({ userId: "61107b8954ee8bb201b13ffe"})
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        console.log(res.text)
                        chai.assert.equal(res.statusCode, 200)
                        done() 
                    })
            })


    })

    it('Should be get error post favorites, data incolplete- JWT OK', (done) => {
        chai.request(app)
            .post('/api/login/')
            .send({username: 'nombre4', password: 'password'})
            .end((err, resLogin) => {
                const token = JSON.parse(resLogin.text).token
                chai.request(app)
                    .post('/api/favorites/')
                    .send({ userId: "61107b8954ee8bb201b13ffe", spaceId: ''})
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 400)
                        done() 
                    })
            })


    })

    it('Should be get error post favorites, replete userid - JWT OK', (done) => {
        chai.request(app)
            .post('/api/login/')
            .send({username: 'nombre4', password: 'password'})
            .end((err, resLogin) => {
                const token = JSON.parse(resLogin.text).token
                chai.request(app)
                    .post('/api/favorites/')
                    .send({ userId: "610b0dc01b99d16fb1b44707", spaceId: '6102b5d92254e2b2f535b18e'})
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        console.log(res.text)
                        chai.assert.equal(res.statusCode, 400)
                        done() 
                    })
            })


    })

    it('Should be get error post favorites, userid not found - JWT OK', (done) => {
        chai.request(app)
            .post('/api/login/')
            .send({username: 'nombre4', password: 'password'})
            .end((err, resLogin) => {
                const token = JSON.parse(resLogin.text).token
                chai.request(app)
                    .post('/api/favorites/')
                    .send({ userId: "6102b4812254e2b2f535b187", spaceId: '6102b5d92254e2b2f535b18e'})
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 400)
                        chai.assert.equal(JSON.parse(res.text).message, 'The user already set this favorite, please add another')
                        done() 
                    })
            })


    })

    it.skip('Should be get error post favorites, spaceId not found - JWT OK', (done) => {
        chai.request(app)
            .post('/api/login/')
            .send({username: 'nombre4', password: 'password'})
            .end((err, resLogin) => {
                const token = JSON.parse(resLogin.text).token
                chai.request(app)
                    .post('/api/favorites/')
                    .send({ userId: "6102b4812254e2b2f535b187", spaceId: '6108da85bac2f4441e548362'})
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 400)
                        done() 
                    })
            })


    })

    it.skip('Should be add a favorite - JWT OK', (done) => {


        chai.request(app)
            .post('/api/login/')
            .send({username: 'nombre4', password: 'password'})
            .end((err, resLogin) => {
                const token = JSON.parse(resLogin.text).token
                chai.request(app)
                    .get('/api/post/')
                    .send({ userId: "61107b8954ee8bb201b13ffe", spaceId: '6102b5042254e2b2f535b189'})
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200)
                        chai.assert.equal(JSON.parse(res.text).message, 'IdUser with favorite created')
                        done() 
                    })
            })


    })

    it('Should be error get favorite, id not fount - JWT OK', (done) => {
        chai.request(app)
            .post('/api/login/')
            .send({username: 'nombre4', password: 'password'})
            .end((err, resLogin) => {
                const token = JSON.parse(resLogin.text).token
                chai.request(app)
                    .get('/api/post/6102b5d92254e2b2f535b18e')
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200)
                        chai.assert.equal(JSON.parse(res.text).message, 'IdUser hasn\'t favorites please add one and try again')
                        
                        done() 
                    })
            })


    })

    it('Should be get favorite, id ok - JWT OK', (done) => {
        chai.request(app)
            .post('/api/login/')
            .send({username: 'nombre4', password: 'password'})
            .end((err, resLogin) => {
                const token = JSON.parse(resLogin.text).token
                chai.request(app)
                    .get('/api/post/6102b4812254e2b2f535b187')
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200)
                        done() 
                    })
            })


    })
})