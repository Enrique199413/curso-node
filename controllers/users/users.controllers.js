const { MongoClient } = require("mongodb");
var ObjectId = require("mongodb").ObjectID;

const uri =
  "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const addUser = async ({ name, lastName, surName }) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const userCollection = client.db("finalExam").collection("users");
    const existRegister = await userCollection.find({
      name,
      lastName,
      surName,
    });
    const user = [];
    await existRegister.forEach((item) => {
      user.push(item);
    });
    if (user.length === 0) {
      const { insertedId } = await userCollection.insertOne({
        name,
        lastName,
        surName,
      });
      return Promise.resolve(insertedId);
    }
    await client.close();
    return Promise.reject({
      message: "Users already exist",
      userExistWithID: user[0]._id,
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

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

const getUsersByParams = async ({ name, lastName, surName }) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const userCollection = client.db("finalExam").collection("users");
    const query = { name, lastName, surName };

    const options = {
      sort: { name: -1 },
      projection: { _id: 1, name: 1, lastName: 1, surName: 1 },
    };
    const users = await userCollection.find(query, options);

    const data = [];
    await users
      .forEach((item) => {
        data.push(item);
        console.log(item);
      })
      .then((finish) => {
        client.close();
      });

    if (data.length === 0) {
      return Promise.resolve({ message: "Not data found" });
    } else {
      return Promise.resolve({
        count: data.length,
        data,
      });
    }
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};

const findAndDeleteUser = async ({ userId }) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const userCollection = client.db("finalExam").collection("users");
    const user = await userCollection.findOneAndDelete({
      _id: ObjectId(userId),
    });
    console.log(user);

    if (user.value === null) {
      return Promise.resolve({ message: "Error to delete user" });
    } else {
      return Promise.resolve({
        message: "success",
        data: user.value,
      });
    }
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};

const findAndUpdateUser = async ({ userId }, { name, lastName, surName }) => {
  console.log("data, ", userId, name, lastName);
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const userCollection = client.db("finalExam").collection("users");
    const user = await userCollection.findOneAndUpdate(
      {
        _id: ObjectId(userId),
      },
      {
        $set: { name: name },
        $set: { lastName: lastName },
        $set: { surName: surName },
      },
      { new: true }
    );
    console.log(user);

    if (user.value === null) {
      return Promise.resolve({ message: "Error to update user" });
    } else {
      return Promise.resolve({
        message: "success",
        data: user.value,
      });
    }
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUsersByParams,
  findAndDeleteUser,
  findAndUpdateUser,
};
