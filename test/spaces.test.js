const mongoUnit = require('mongo-unit')
const { expect } = require('chai')
const spacesController = require('../spaces/spaces.controller')
let mongoURL

    (async(dbName) => {
    await mongoUnit.start({ dbName })
    mongoURL = mongoUnit.getUrl()
    run()
})('users')

after(async() => {
    await mongoUnit.stop()
})

describe('unitTest spaces controller', () => {

    it('should be data from getRegisterUser', async() => {
        const allUsers = await spacesController.getSpaces()
        expect(allUsers.length).to.equal(allUsers.length)
    })

})