const { MongoClient } = require("mongodb");
const uri =
  process.env.MONGO_DB_URL ||
  "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/finalExam?retryWrites=true&w=majority";

const getSpaces = async () => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const userCollection = client.db("finalExam").collection("spaces");
    const cursorUsers = userCollection.find({});
    const data = [];
    await cursorUsers.forEach((element) => {
      data.push(element);
    });
    await client.close();
    return Promise.resolve(data);
  } catch {
    return Promise.reject("Something going wrong");
  }
};

module.exports = { getSpaces };
