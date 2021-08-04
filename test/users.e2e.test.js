const chai = require('chai')
const assert = chai.assert
const chaiHttp = require('chai-http')
    // const httpUsers = require('../users/users.http')
chai.use(chaiHttp)

const app = require('../app')

// (async() => {
// await run()
// })()

describe('suite all users', () => {
    it('Should get users with no token', (done) => {
        chai.request(app)
            .get('/users')
            .end((err, res) => {
                assert.equal(res.status, 401)
                assert.equal(res.text, 'Unathorized')
                done()
            })
    })
    it('Should get users with no token', (done) => {
        chai.request(app)
            .get('/login')
            .end(({
                username: "ameme",
                password: "password"
            }).end((err, res) => {
                const { token } = JSON.parse(res.text)
                chai.request(app)
                    .get('/users')
                    .set('Authorization', `JWT ${token}`)
                    .end((usersErr, usersRes) => {
                        assert.equal(usersRes.status, 200)
                        done()
                    })
                assert.equal(res.status, 401)
                assert.equal(res.text, 'Unathorized')
                done()
            }))
    })
})