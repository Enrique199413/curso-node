const { MongoClient } = require("mongodb");
const uri =
  process.env.MONGO_DB_URL ||
  "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// const mongoDbCollection = (uri, dbName, collectionName) => {
//   const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   const dataBase = dbName;
//   const collection = collectionName;
//   let currentCollection;

//   return () => ({
//     connect: async () => {
//       const currentClient = await client.connect();
//       currentCollection = client.db(dataBase).collection(collection);
//       return currentClient;
//     },
//     getCurrentCollection: () => {
//       return currentCollection;
//     },
//     exec: async (param, option) => {
//       if (currentCollection) {
//         return await currentCollection[param](option);
//       }
//     },
//     close: async () => {
//       await client.close();
//     },
//   });
// };

const mongoDbCollection = (uri) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  let currentCollection;

  return (dbName, collectionName) => ({
    connect: async () => {
      const currentClient = await client.connect();
      currentCollection = client.db(dbName).collection(collectionName);
      return {
        client: currentClient,
        getCurrentCollection: () => {
          return currentCollection;
        },
        exec: async (param, options) => {
          if (currentCollection) {
            return await currentCollection[param](options);
          }
        },
        closeCurrentCollection: async () => {
          await currentClient.close();
        },
      };
    },
  });
};

module.exports = mongoDbCollection;
