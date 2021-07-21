const {MongoClient} = require('mongodb')

const mongoDbCollection = (uri) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    let currentCollection

    return (dbName, collectionName) => ({
        connect: async () => {
            const currentClient = await client.connect()
            currentCollection = client.db(dbName).collection(collectionName)
            return{
                client: currentClient,
                getCurrentCollection: () => {
                    return currentCollection
                },
                exec: async (param, options) => {
                    if (currentCollection) {
                        return await currentCollection[param](options)
                    }
                },
                closeCurrentConnections: async () => {
                    await currentClient.close()
                }
            }
        }
    })

}

module.exports = mongoDbCollection