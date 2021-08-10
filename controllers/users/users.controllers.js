const { MongoClient } = require("mongodb");
var ObjectId = require("mongodb").ObjectID;

const uri =
  "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const getAllUsers = () => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const users = new Promise((resolve, reject) => {
    client.connect((err) => {
      if (err) {
        reject(err);
      }
      const userCollection = client.db("finalExam").collection("users");
      const cursorUsers = userCollection.find({});
      const data = [];
      cursorUsers
        .forEach((item) => {
          data.push(item);
        })
        .then((finish) => {
          resolve({ count: data.length, data });
          client.close();
        });
      console.log(userCollection);
    });
  });

  return users;
};

module.exports = {
    getAllUsers,
  };
