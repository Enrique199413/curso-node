//
// const chai = require('chai')
// const assert = chai.assert
// const errorCode = require('./mock/errorCode')
// const chaiHttp = require('chai-http')
// chai.use(chaiHttp)
//
// const app = require('../index')
// const { response } = require('express')
//
// describe('Suite test get method', () => {
//
//     it('should be 2 from 1 + 1', () => {
//         assert.equal(1+1, 2)
//     })
//
//     it('Should verify hello world', (done) => {
//         chai.request(app)
//           .get('/hola-mundo')
//           .end((err, res) => {
//             chai.assert.equal(res.text, 'Hello World,.....................!')
//             done()
//         })
//     })
//
//     it('should be send queryParms and get sum from a and b', () => {
//         const a = 10
//         const b = 10
//         chai.request(app)
//             .get('/hola-mundo/suma')
//             //.send({
//             //    a: 10,
//             //    b: 10
//             //})
//             .query({
//                 a,
//                 b
//             })
//             .end( (err, response) => {
//                 const responseNumber = response.text
//                 assert.equal(`${responseNumber}`, `la suma de 10 + 10 es 20`)
//
//         })
//     })
//
//     it('should be send queryParms and get sum from -a and -b', () => {
//         const a = -1
//         const b = -1
//         chai.request(app)
//             .get('/hola-mundo/suma')
//             //.send({
//             //    a: 10,
//             //    b: 10
//             //})
//             .query({
//                 a,
//                 b
//             })
//             .end( (err, response) => {
//                 const responseNumber = response.text
//                 assert.equal(`${responseNumber}`, `la suma de -1 + -1 es -2`)
//
//         })
//     })
//
//
//     it('should be send queryParms and get sum from a and b are string', () => {
//         const a = 'cien'
//         const b = 'veinte'
//         chai.request(app)
//             .get('/hola-mundo/suma')
//             //.send({
//             //    a: 10,
//             //    b: 10
//             //})
//             .query({
//                 a: 10,
//                 b: 10
//             })
//             .end( (err, response) => {
//                 const responseNumber = response.body
//                 assert.deepEqual(responseNumber, errorCode.errorWhenIsNotNumeric(a,b))
//
//             })
//     })
//
//
// })
//
// describe('Test on get Airtable', () => {
//
//     it('Should be if enviromenr variable not exist', () => {
//         chai.request(app)
//         .get()
//         .end( (error, response) => {
//             console.log(error, response)
//             assert.equal(response.status, 401)
//             assert.deepEqual(response.text, errorCode.errorWhenEnviromentExist)
//         })
//     })
//
//
//     it('Should be if enviromenr variable exist', () => {
//         process.env.AIR_TABLE_APIKEY='keyJ3OWAzy9mtk0LC'
//
//         //airtabloe tarda en reposnde , las peticiones son sincronas
//         chai.request(app)
//         .get()
//         .end( (error, response) => {
//             console.log(error, response)
//             assert.equal(response.status, 200)
//             assert.deepEqual(response.text, '')
//             // done indicar que ya acabo
//             done()
//         })
//     })
//
// })
