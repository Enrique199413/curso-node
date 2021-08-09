const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp)

const app = require('../app')

describe('Test login', () => {

    it('Should login with user not valid', () => {
        chai.request(app)
        .post('/api/login')
        .send({
            username: "raf@gmail.com",
            password: "passwordbienloco"
        }).end((err, res) => {
            assert.deepEqual(res.body, {errors: "Please add correct username and password"})
            assert.equal(res.status, 400)
        })
    })

    it('Should login with password not valid', () => {
        chai.request(app)
        .post('/api/login')
        .send({
            username: "rafa3@gmail.com",
            password: "passwordmalo"
        }).end((err, res) => {
            assert.deepEqual(res.body, {errors: "Please add correct username and password"})
            assert.equal(res.status, 400)
        })
    })

    it('Should login success', () => {
        chai.request(app)
        .post('/api/login')
        .send({
            username: "rafa3@gmail.com",
            password: "passwordbienloco"
        }).end((err, res) => {
            assert.equal(res.status, 200)
        })
    })
})