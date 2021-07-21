const mongoUnit = require('mongo-unit')
const allMockData = require('./mock/dbCollection.json')
const expect = require('chai').expect
let mongoURL
let usersController

/*
mongoUnit.start({
    dbName: 'users',
    port: '27080'
}).then(() => {
    const url = mongoUnit.getUrl()
    console.log('Tu mongo FAKE esta funcionando aqui: ', url)
    run()
}).catch(e => {
    console.log(e)
})
*/


(async(dbName) => {
    try {
        await mongoUnit.start({dbName})
        mongoURL = mongoUnit.getUrl()
        console.log('Tu mongo FAKE esta funcionando aqui: ', url)
    } catch (error) {
        console.log(error)
    }
    
    run()
})('users')


/*
before(() => {
    console.log('Esto se debe de ejecutar antes')
})
*/



after(async () => {
    console.log('Esto es al finalizar')
    await mongoUnit.stop()
})

describe('unitTest users controller', () => {
    before(() => {
        process.env.MONGO_DB_URL = mongoURL
        usersController = require('../users/users.controller')
    })

    afterEach(() => {
        mongoUnit.drop()
    })
    beforeEach(() => {
        mongoUnit.initDb(mongoURL, allMockData)
    })

    it('should be data from getAllUsers', async() => {
        const users = await usersController.getAllUsers()
        expect(users.length).to.equal(4)
        expect(users[0].name).to.equal('Enrique')
        expect(users[0]._id).to.equal('123')
        expect(users[0].lastName).to.equal('Enrique')
        resolve()
    })

    it('should be send data from new User', async() => {
        const userAdded = await usersController.addUsers({
            lastName: 'Pepe',
            surName: 'Alonso',
            name: 'Enrique'
        })
        const users = await usersController.getAllUsers()
        expect(users.length).to.equal(4)
        expect(users[0].name).to.equal('Enrique')
        expect(users[0].lastName).to.equal('Pepe')
        expect(users[0].surName).to.equal('Alonso')
        resolve()
    })

    
})
