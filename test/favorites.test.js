const mongoUnit = require('mongo-unit')
const { expect } = require('chai')
let mongoURL

    (async(dbName) => {
    await mongoUnit.start({ dbName })
    mongoURL = mongoUnit.getUrl()
    run()
})('favorites')

after(async() => {
    await mongoUnit.stop()
})

describe('unitTest favorites controller', () => {
    before(() => {
        process.env.MONGO_BD_URL = mongoUnit
        favoritesController = require('../favorites/favorites.controller')
    })

    it('should be data from getAllFavorites', async() => {
        const allUsers = await favoritesController.getAllFavorites({})
        expect(allUsers.length).to.equal(allUsers.length)
    })

    it('should be add data from addFavorite', async() => {
        const data = {
            userId: '12121212',
            favorites: ['12121212', '23232323']
        }
        expect(await favoritesController.addFavorite(data))
    })

    it('should be get one favorite', async() => {
        const favorites = ['12121212', '23232323']
        expect(await favoritesController.getFavorite(favorites))
    })

    it('should be update', async() => {
        const favoritesUpdate = ['36387437']
        const favoriteData = await favoritesController.getAllFavorites({})
        const arrFavorites = favoriteData[1].favorites.push(favoritesUpdate)
        await favoritesController.updateFavorite(favoriteData[1].userId, favoritesUpdate)
        expect(arrFavorites).to.equal(1)
    }).timeout(5000)


    it('should be data from deleteFavorite', async() => {
        const favoriteData = await favoritesController.getAllFavorites({})
        expect(await favoritesController.deleteFavorite(favoriteData[7].userId))
    }).timeout(8000)


})