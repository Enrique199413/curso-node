const {MongoClient} = require('mongo')
const uri = process.env.MONGO_DB_URL

const mongoDbCollection = (uri, dbName, collectionName) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    const database = dbName
    const collection = collectionName
    return () => {
        connect: async () => {
            return client.bd(database, collection)
        }
        /*
        ,
        exec: async (param, options) => {
            
        }*/
    }
}