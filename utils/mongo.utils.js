const { MongoClient } = require('mongodb')
const uri = process.env.MONGO_DB_URL

const mongoDbCollection = (uri) => {
    const client = new MongoClient(uri, { useNewParser: true, useUnifiedTopology: true })
    let currentCollection
    return (dbName, collectionName) => ({
        connect: async () => {
            const currentClient = await client.connect()
            currentCollection = client.db(dbName).collection(collectionName)
            return {
                client: currentCollection,
                getCurrentCollection: () => {
                    return currentCollection
                },
                exec: async (param, options, filter = null) => {
                    if (currentCollection) {
                        if (filter) {
                            return await currentCollection[param](filter, options)
                        }else {
                            return await currentCollection[param](options)
                        }
                    }
                },
                closeCurrentConnection: async () => {
                    await currentClient.close()
                }
            }
        }
    })
}

module.exports = mongoDbCollection