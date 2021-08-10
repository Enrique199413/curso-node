const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");
const uri =
  process.env.MONGO_DB_URL ||
  "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/finalExam?retryWrites=true&w=majority";

const loginUser = async ({ username, password }) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const userCollection = client.db("finalExam").collection("users");
    const userToRegister = await userCollection.findOne({
      username,
      password,
    });

    if (userToRegister) {
      const token = jwt.sign({ username, password }, "nodeJSSecret");
      return Promise.resolve(token);
    }
    await client.close();
    return Promise.reject("Please add correct username and password");
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = { loginUser };
