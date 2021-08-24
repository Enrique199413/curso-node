const { MongoClient } = require("mongodb");
const { validateUser } = require("../utils/validators.utils");
const uri =
  process.env.MONGO_DB_URL ||
  "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/finalExam?retryWrites=true&w=majority";

const registerUser = async ({ username, password }) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    console.log({ username, password });

    const error = await validateUser({ username, password });

    if (username === undefined && password === undefined) {
      return Promise.reject("Please add username and password");
    } else if (error.error) {
      return Promise.reject(error.error.details[0].message);
    }

    await client.connect();
    const userCollection = client.db("finalExam").collection("users");
    const userToRegister = await userCollection.findOne({
      username,
    });

    if (!userToRegister) {
      const user = await userCollection.insertOne({ username, password });
      return Promise.resolve(user);
    }
    await client.close();
    return Promise.reject("Username exist, please login");
  } catch (error) {
    return Promise.reject("Error");
  }
};

module.exports = { registerUser };
