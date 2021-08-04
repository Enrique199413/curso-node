const mongoUnit = require('mongo-unit')
const { expect } = require('chai');
const { loginWithUsernameAndPassword } = require('../login/login.controller');
const error = require('./mocks/errorCodeLogin')
let mongoURL

    (async() => {
    await mongoUnit.start()
    mongoURL = mongoUnit.getUrl()
    console.log('tu mongo funciona aqui: ', mongoURL)
    run()
})('user')

after(async() => {
    await mongoUnit.stop()
})

describe('unitTest login controller', () => {
    before(() => {
        process.env.MONGO_BD_URL = mongoUnit
        login = require('../login/login.controller')
    })

    // it('should error', async() => {
    // const res = await loginWithUsernameAndPassword().
    // expect(res).throw(error.errorMessage)
    // })

    it('should loginWithUsernameAndPassword', async() => {
        const data = {
            username: "ame",
            password: "password"
        }
        const response = await loginWithUsernameAndPassword(data.username, data.username, 'nodeJSSecret')
        expect(response)
    })


})