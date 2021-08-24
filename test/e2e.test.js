const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = require('chai').expect;
chai.use(chaiHttp)

const index = require('../index')

describe('e2e test', () => {
    it('should get register', (done) => {
        chai.request(index)
            .get('/api/register')
            .end((err, res) => {
                console.log(res)
                expect(res).to.have.status(401)
                done()
            })
    })
    it('should post register', (done) => {
        chai.request(index)
            .post('/api/register')
            .send({ username: 'user@email.com', password: "password" })
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            })
    }).timeout(5000)
    it('should login', (done) => {
        chai.request(index)
            .get('/api/login')
            .send({ email: "ameale@correo.com", password: "password" })
            .end((err, res) => {
                console.log(res)
                expect(res).to.have.status(404);
                done()
            })
    })
    it('should get spaces', (done) => {
        chai.request(index)
            .get('/api/spaces')
            .end((err, res) => {
                console.log(res)
                expect(res).to.have.status(401);
                done()
            })
    })
    it('should get all favorites', (done) => {
        chai.request(index)
            .get('/api/favorites')
            .end((err, res) => {
                console.log(res)
                expect(res).to.have.status(401);
                done()
            })
    })
    it('should get favorites', (done) => {
        chai.request(index)
            .get('/api/favorites/:id')
            .end((err, res) => {
                console.log(res)
                expect(res).to.have.status(401);
                done()
            })
    })
    it('should update favorites', (done) => {
        chai.request(index)
            .put('/api/favorites/:id')
            .end((err, res) => {
                console.log(res)
                expect(res).to.have.status(401);
                done()
            })
    })
    it('should delete favorites', (done) => {
        chai.request(index)
            .delete('/api/favorites/:id')
            .end((err, res) => {
                console.log(res)
                expect(res).to.have.status(401);
                done()
            })
    })
})