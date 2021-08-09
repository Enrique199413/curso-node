const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp)

const app = require('../app')

describe('Test getallSpaces', () => {

    it('if you dont have an access token', () => {
        chai.request(app)
        .get('/api/spaces')
        .end( (err, response) => {
            assert.equal(response.text, "Unauthorized")
            assert.equal(response.status, 401)
        })
    })

    it('Should be get all spaces with token', () => {
        chai.request(app)
        .post('/api/login')
        .send({
            username: "rafa3@gmail.com",
            password: "passwordbienloco"
        }).end((err, res) => {
            const {token} = JSON.parse(res.text)
            chai.request(app)
            .get('/api/spaces')
            .set('Authorization', `JWT ${token}`)
            .end( (spaceErr, spaceResponse) => {
                assert.equal(spaceResponse.status, 200)
            })
        })
    })
})