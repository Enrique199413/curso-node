const mongoUnit = require('mongo-unit')
const expect = require('chai').expect
const allMockCollections = require('./mock/dbCollection.json')

    let mongoUrl
    let userController
/*mongoUnit.start({
    dbName: 'users',
    port: 27000
}).then(() => {
    const url = mongoUnit.getUrl()
    console.log('Tu mongo', url)
    run()
})

const loadMongo = async (dbName) => {
    await mongoUnit.start({dbName})

    const mongourl = mongoUnit.getUrl()
    run()
}

loadMongo()*/

(async (dbName) => {
    await mongoUnit.start({dbName})
    mongoUrl = mongoUnit.getUrl()
    console.log('Tu mongo', mongoUrl)
    run()

})('users')


after(async () => {
    console.log('Esto se ejecuta despues')
    await mongoUnit.stop()

})

describe('unit test user controller', () => {

    before(() => {
        //console.log('Esto se ejecuta antes')
        process.env.MONGO_DB_URI = mongoUrl
        userController = require('../users/users.controller')
    })

    afterEach(() => {
        //console.log('afterEach')
        mongoUnit.drop()
    })

    beforeEach(() => {
        //console.log('afterEach')
        mongoUnit.initDb(mongoUrl, allMockCollections)
    })

    it('should by data from getAllUSe',    () => {
        return new Promise(async (resolve) => {
            const user = await userController.getAllUser().then(users => {
                //console.log('User: ',users)
                expect(users.length).to.equal(4)
                expect(users[3].name).to.equal('Enriqu4e')
                expect(users[3]._id).to.equal(1236,)
                expect(users[3].lastName).to.equal('Callejas')
                resolve()
            })
        })
        //console.log('Esto es un it')



    })

    it('should by data from getAllUSe catch',    async () => {
        // TODO error test
        try {
            await userController.getAllUser().then(users => {
                //console.log('User catch: ', users)
                expect(users.length).to.equal(4)
                expect(users[3].name).to.equal('Enriqu4e')
                expect(users[3]._id).to.equal(1236,)
                expect(users[3].lastName).to.equal('Callejas')
            })
        } catch (e) {
            //console.log('Esto es un error', e)
            expect(e).deep.equal({error: ''})
        }


    })

    it('should by send data from new user',   () => {
        return new Promise(async (resolve) => {
            //console.log('Esto es un it')
            const userAdded = await userController.addUser({
                name: 'Fake1',
                lastName: 'lastname',
                surName: 'surname'
            })
            //console.log('-----usuario agregado: ',userAdded)

            const user = await userController.getAllUser()
            //console.log('lista de usuario', user)
            expect(user.length).to.equal(5)
            expect(user[4].name).to.equal('Fake1')
            expect(user[4].lastName).to.equal('lastname')
            expect(user[4].surName).to.equal('surname')
            resolve()
        })
    })

    it('should by send data from new user CATCH REPET USER',  async () => {
            //console.log('Esto es un it')
            try {
                const userAdded = await userController.addUser({
                    name: 'Enrique3',
                    lastName: 'Enrique2',
                    surName: 'Enrique'
                })
                // console.log('-----usuario agregado CATCH: ', userAdded)

                const user = await userController.getAllUser()
                //console.log('lista de usuario', user)
                expect(user.length).to.equal(5)
                expect(user[4].name).to.equal('Fake1')
                expect(user[4].lastName).to.equal('lastname')
                expect(user[4].surName).to.equal('surname')
                resolve()
            }catch (e) {
                //console.log(e)
                expect(e.message).deep.equal( 'Cant create a register')

            }
    })

    /*it('should by send data from new user addUserConnectionClousure',  async () => {
        return new Promise(async (resolve) => {
            console.log('Esto es un it')
            const userAdded = await userController.addUserConnectionClousure({
                name: 'Fake2',
                lastName: 'lastname2',
                surName: 'surname2'
            })
            console.log('-----usuario agregado: ')

            const user = await userController.getAllUser()
            //console.log('lista de usuario', user)
            expect(user.length).to.equal(5)
            expect(user[4].name).to.equal('Fake2')
            expect(user[4].lastName).to.equal('lastname2')
            expect(user[4].surName).to.equal('surname2')
            resolve()
        })
    })
*/

    it('should by send data from new user update all data',   async () => {
            const usersBefore = await userController.getAllUser()
            const updateUser = await userController.updateUser(usersBefore[0]._id, {
                name: 'Enrique1Updatte',
                lastName: 'hj',
                surName: 'Update'
            })
            const users = await userController.getAllUser()

            expect(users.length).to.equal(4)
            expect(users[0].name).to.equal('Enrique1Updatte')
            expect(users[0].lastName).to.equal('hj')
            expect(users[0].surName).to.equal('Update')
            //console.log(users)
    })

    it('should by send data from new user update all data CATCH REPET USER',   async () => {
        try {
            const usersBefore = await userController.getAllUser()
            const updateUser = await userController.updateUser(usersBefore[0]._id, {
                name: 'Enrique3',
                lastName: 'Enrique2',
                surName: 'Enrique'
            })
        } catch (e) {
            //console.log(e)
            expect(e.message).deep.equal( 'Cant update a register, because id not exist or data exist')
        }

    })


    it('should by send data from new user update all data CATCH ID NOT FOUNT',   async () => {
        try {
            const updateUser = await userController.updateUser(12345677654334, {
                name: 'Enrique3',
                lastName: 'Enrique2',
                surName: 'Enrique'
            })
        } catch (e) {
            //console.log(e)
            expect(e.message).deep.equal( 'Cant update a register, because id not exist or data exist')
        }

    })

    it('should by delete a user by id',   async () => {
        return new Promise(async (resolve) => {
            //console.log('Esto es un it')
            const user = await userController.getAllUser()
            //console.log(user[4])
            //console.log(user[3])
            const deleteUser = await userController.deleteUser(user[3]._id)
            //console.log('-----usuario borrado: ', deleteUser)


            //console.log('lista de usuario', user)
            expect(deleteUser.statusDelete).to.equal(201)
            resolve()
        })
    })

    it('should by delete a user by id dont fount CATCH',  async () => {

        try {
            const deleteUser = await userController.deleteUser(234567)
            //console.log('-----usuario borrado: ', deleteUser)
        } catch (e) {

            //console.log('delete de usuario not found', e)
            expect(e.message).to.equal('Cant delete user, because not exist')
        }

    })

    it('should by found name, lastname, surname',  async () => {
        return new Promise(async (resolve) => {
            //console.log('Esto es un it')
            const findUser = await userController.getByParams({
                name: 'Enrique2',
                lastName: 'Enrique2',
                surName: 'Enrique2'
            })
            //console.log('-----usuario encontrado: ',findUser)
            expect(findUser.count).to.equal(1)
            expect(findUser.data[0].name).to.equal('Enrique2')
            expect(findUser.data[0].lastName).to.equal('Enrique2')
            expect(findUser.data[0].surName).to.equal('Enrique2')
            resolve()
        })
    })

    it('should by found surname',  async () => {
        return new Promise(async (resolve) => {
            //console.log('Esto es un it')
            const findUser = await userController.getByParams({
                surName: 'Enrique'
            })
            //console.log('-----usuario encontrado por surname: ',findUser)
            expect(findUser.count).to.equal(3)
            expect(findUser.data[1].name).to.equal('Enrique3')
            expect(findUser.data[1].lastName).to.equal('Enrique2')
            expect(findUser.data[1].surName).to.equal('Enrique')
            resolve()
        })
    })

    it('should by found lastname',  async () => {
        return new Promise(async (resolve) => {
            //console.log('Esto es un it')
            const findUser = await userController.getByParams({
                lastName: 'Enrique2'
            })
            //console.log('-----usuario encontrado por surname: ',findUser)
            expect(findUser.count).to.equal(2)
            expect(findUser.data[1].name).to.equal('Enrique3')
            expect(findUser.data[1].lastName).to.equal('Enrique2')
            expect(findUser.data[1].surName).to.equal('Enrique')
            resolve()
        })
    })

    it('should by WITHOUT DATA',  async () => {
            console.log('GET ALL WITHOUT PARAMS')
        try {
            const findUser = await userController.getByParams({})
            console.log('-----usuario encontrado por surname: ', findUser)
            expect(findUser.count).to.equal(4)
            expect(findUser.data[1].name).to.equal('Enrique2')
            expect(findUser.data[1].lastName).to.equal('Enrique2')
            expect(findUser.data[1].surName).to.equal('Enrique2')
        } catch (e) {
                console.log(e)
        }

    })

    it('should by CONNECTION ERROR',  async () => {
        //TODO close conection for error
        // TODO error not valid
        //await mongoUnit.stop()
        try {
            const findUser = await userController.getByParams({})
            console.log('-----usuario encontrado por surname: ', findUser)
            expect(findUser.count).to.equal(4)
            expect(findUser.data[1].name).to.equal('Enrique2')
            expect(findUser.data[1].lastName).to.equal('Enrique2')
            expect(findUser.data[1].surName).to.equal('Enrique2')
        } catch (e) {
            console.log(e)
            //done()
        }

    })
})

describe('unit test user controller', () => {
    before(() => {
        console.log('Esto se ejecuta antes describe 2')
        console.log('Esto se ejecuta antes describe 2')
    })
})