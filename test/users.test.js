const mongoUnit = require('mongo-unit')
const { expect } = require('chai')
const allCollections = require('./mocks/dbCollection.json')
    // const expect = require('chai').expect
let mongoURL

// mongoUnit.start({ dbName: 'users', port: 27080 }).then(() => {
// const url = mongoUnit.getUrl()
// console.log('tu mongo funciona aqui: ', url)
// run()
// })

    (async(dbName) => {
    await mongoUnit.start({ dbName })
    mongoURL = mongoUnit.getUrl()
    console.log('tu mongo funciona aqui: ', mongoURL)
    run()
})('users')

// before(() => {
// console.log('esto se debe ejecutar antes')
// })

after(async() => {
    // console.log('esto es al finalizar')
    await mongoUnit.stop()
})

describe('unitTest users controller', () => {
    before(() => {
        // console.log('BEFORE DENTRO DEL IT')
        process.env.MONGO_BD_URL = mongoUnit
        usersController = require('../users/users.controller')
    })

    // after(() => {
    // console.log('AFTER DENTRO DEL IT')
    // })

    afterEach(() => {
        // console.log('afterEACH DENTRO DEL IT')
        mongoUnit.drop()
    })

    beforeEach(() => {
        // console.log('BEFOREEACH DENTRO DEL IT')
        mongoUnit.initDb(mongoURL, allCollections.users)
    })

    it('should be data from getAllUsers', async() => {
        const users = await usersController.getAllUsers()
        expect(users.length).to.equal(86)
    })

    it('should be data from update Users', async() => {
        console.log('esto es un update')
        const dataUserUpdate = {
            name: 'EnriqueLopezUpdateNew'
        }
        const userId = await usersController.getAllUsers()
        console.log('IDDD', userId[4])
        const users = await usersController.updateUser(userId[4]._id, dataUserUpdate.name)
        expect(users.name).deep.equal(dataUserUpdate.name)
        resolve()

    })

    it.only('should be data from delete Users', async() => {
        console.log('esto es un delete')
        const userId = await usersController.getAllUsers()
        console.log('IDDD', userId[4])
        const usersDelete = await usersController.deleteUser(userId[4]._id)

    })

})