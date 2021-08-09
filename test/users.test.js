const mongoUnit = require('mongo-unit')
const { expect } = require('chai')
const usersController = require('../users/users.controller')
let mongoURL

    (async(dbName) => {
    await mongoUnit.start({ dbName })
    mongoURL = mongoUnit.getUrl()
    run()
})('users')

after(async() => {
    await mongoUnit.stop()
})

describe('unitTest users controller', () => {

    it('should be data from getRegisterUser', async() => {
        const allUsers = await usersController.getRegisterUser()
        expect(allUsers.length).to.equal(allUsers.length)
    })

    it('should be register', async() => {
        const data = {
            username: 'correo@email.com',
            password: 'password'
        }
        expect(await usersController.registerUser(data))
    })
})