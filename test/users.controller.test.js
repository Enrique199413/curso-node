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
    mongoURL = mongoUnit.getUrl()
    console.log('Tu mongo FAKE esta funcionando aqui: ', mongoURL)
    run()
})
*/

(async(dbName) => {
    try {
        console.log({dbName})
        mongoUnit.start({dbName, verbose: true, port: 27008}).then(
            
            (response) => {
                console.log(response)
                mongoURL = mongoUnit.getUrl()
                console.log('Tu mongo FAKE esta funcionando aqui: ', mongoURL)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
        
    } catch (error) {
        console.log('ERRORRRRRRR')
        console.log(error)
    }
    run()
})('users')

after(async() => {
    await mongoUnit.stop()
} )

describe('Test ', () => {
    before(() => {

    })

    afterEach(() => {
        mongoUnit.drop()
    })

    beforeEach(() => {
        mongoUnit.initDb(mongoURL, allMockData)
    })
})