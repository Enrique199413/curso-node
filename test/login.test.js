const mongoUnit = require('mongo-unit')
const { expect } = require('chai');
const { loginWithEmailAndPassword } = require('../login/login.controller');
let mongoURL

    (async() => {
    await mongoUnit.start()
    mongoURL = mongoUnit.getUrl()
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

    it('should login', async() => {
        const data = {
            username: "ame",
            password: "password"
        }
        const response = await loginWithEmailAndPassword(data.username, data.password, 'nodeJSSecret')
        expect(response)
    })
})