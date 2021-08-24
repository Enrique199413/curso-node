const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp)

const app = require('../app')
const userId = "610b0dc01b99d16fb1b44707"

describe('Test favorites', () => {

    it('if you dont have an access token getallfavorites', () => {
        chai.request(app)
        .get('/api/users')
        .end( (err, response) => {
            assert.equal(response.text, "Unauthorized")
            assert.equal(response.status, 401)
        })
    })

    it('Should be get allFavorites with token', () => {
        chai.request(app)
        .post('/api/login')
        .send({
            username: "rafa3@gmail.com",
            password: "passwordbienloco"
        }).end((err, res) => {
            const {token} = JSON.parse(res.text)
            chai.request(app)
            .get('/api/favorites')
            .set('Authorization', `JWT ${token}`)
            .end( (error, response) => {
                console.log("body", response)
                assert.equal(response.status, 200)
            })
        })
    })

    it('Should be get favorites by userId with token', () => {
        chai.request(app)
        .post('/api/login')
        .send({
            username: "rafa3@gmail.com",
            password: "passwordbienloco"
        }).end((err, res) => {
            const {token} = JSON.parse(res.text)
            chai.request(app)
            .get(`/api/favorites/${userId}`)
            .set('Authorization', `JWT ${token}`)
            .end( (error, response) => {
                assert.equal(response.status, 200)
            })
        })
    })

    it('Should be add favorites by userId with token', () => {
        chai.request(app)
        .post('/api/login')
        .send({
            username: "rafa3@gmail.com",
            password: "passwordbienloco"
        }).end((err, res) => {
            const {token} = JSON.parse(res.text)
            chai.request(app)
            .post(`/api/favorites`)
            .set('Authorization', `JWT ${token}`)
            .send(
                {
                    userId: "610b0dc01b99d16fb1b44707",
                    spaceId: "6102b50b2254e2b2f535b18a"
                }
            )
            .end( (error, response) => {
                console.log(response.body)
                assert.equal(response.status, 202)
                assert.deepEqual(response.body, { message: 'The user already set this favorite, please add another' })
            })
        })
    })

    it('Should be delete favorites by userId with token', () => {
        chai.request(app)
        .post('/api/login')
        .send({
            username: "rafa3@gmail.com",
            password: "passwordbienloco"
        }).end((err, res) => {
            const {token} = JSON.parse(res.text)
            chai.request(app)
            .delete(`/api/favorites/610b0dc01b99d16fb1b44707`)
            .set('Authorization', `JWT ${token}`)
            .end( (error, response) => {
                console.log("body", response.body)
                assert.equal(response.status, 200)
                assert.deepEqual(response.body, { message: "favorite list of userId deleted" })
            })
        })
    })

    // it('UserId hasnt get favorites list', () => {
    //     chai.request(app)
    //     .post('/api/login')
    //     .send({
    //         username: "rafa3@gmail.com",
    //         password: "passwordbienloco"
    //     }).end((err, res) => {
    //         const {token} = JSON.parse(res.text)
    //         chai.request(app)
    //         .delete(`/api/favorites/610b0dc01b99d16fb1b44707`)
    //         .set('Authorization', `JWT ${token}`)
    //         .end( (error, response) => {
    //             console.log(response.body)
    //             assert.equal(response.status, 202)
    //             assert.deepEqual(response.body, {message: "IdUser hasn't get favorites list, please add first and then try deleted"})
    //         })
    //     })
    // })

    // it('Should be get favorites by userId hasnt get favorites list', () => {
    //     chai.request(app)
    //     .post('/api/login')
    //     .send({
    //         username: "rafa3@gmail.com",
    //         password: "passwordbienloco"
    //     }).end((err, res) => {
    //         const {token} = JSON.parse(res.text)
    //         chai.request(app)
    //         .get(`/api/favorites/${userId}`)
    //         .set('Authorization', `JWT ${token}`)
    //         .end( (error, response) => {
    //             assert.equal(response.status, 200)
    //             assert.deepEqual(response.body, { message: "IdUser hasn't favorites please add one and try again" })
    //         })
    //     })
    // })

})