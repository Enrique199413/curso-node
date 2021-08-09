const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp)

const app = require('../app')

describe('Test users', () => {

    it('if you dont have an access token getallUsers', () => {
        chai.request(app)
        .get('/api/users')
        .end( (err, response) => {
            assert.equal(response.text, "Unauthorized")
            assert.equal(response.status, 401)
        })
    })

    it('Should be get allUsers with token', () => {
        chai.request(app)
        .post('/api/login')
        .send({
            username: "rafa3@gmail.com",
            password: "passwordbienloco"
        }).end((err, res) => {
            const {token} = JSON.parse(res.text)
            chai.request(app)
            .get('/api/users')
            .set('Authorization', `JWT ${token}`)
            .end( (spaceErr, spaceResponse) => {
                assert.equal(spaceResponse.status, 200)
            })
        })
    })

    //Comentada para que no se esten creando muchos usuarios :-P
    // it('Should be register a new user', () => {
    //     chai.request(app)
    //     .post('/api/register')
    //     .send(
    //         {
    //             "username": "rafa8@gmail.com",
    //             "password": "passwordbienloco"
    //         }
    //     )
    //     .end( (err, response) => {
    //         assert.equal(response.status, 200)
    //     })
    // })

    it('Should be try register user exist', () => {
        chai.request(app)
        .post('/api/register')
        .send(
            {
                "username": "rafa3@gmail.com",
                "password": "passwordbienloco"
            }
        )
        .end( (err, response) => {
            assert.equal(response.status, 400)
            assert.deepEqual(response.body, {message: "Username exist please login"})
        })
    })
})