const { MongoClient, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const addUser = async ({ name, lastName, surName }) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const userCollection = client.db("users").collection("users");
    const user = await userCollection.findOne({ name, lastName, surName });

    if (!user) {
      const { insertedId } = await userCollection.insertOne({
        name,
        lastName,
        surName,
      });
      return Promise.resolve(insertedId);
    }

    await client.close();
    return Promise.reject({
      message: "User already exist",
      id: user._id,
    });
  } catch (error) {
    reject(error);
    return Promise.reject(error);
  }
};

const getAllUsers = async () => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const userCollection = client.db("users").collection("users");
    const cursorUsers = userCollection.find({});
    const data = [];
    await cursorUsers.forEach((element) => {
      data.push(element);
    });
    await client.close();
    return Promise.resolve(data);
  } catch (error) {
    reject(error);
    return Promise.reject(error);
  }
};

const findUser = async (params) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    console.log(params);
    await client.connect();
    const userCollection = client.db("users").collection("users");

    const user = await userCollection.find({ params });

    const data = [];
    await user.forEach((element) => {
      data.push(element);
    });

    console.log(data);
    // if (!user) {
    //   const data = [];
    //   await cursorUsers.forEach((element) => {
    //     data.push(element);
    //   });
    //   await client.close();
    //   return Promise.resolve(data);
    // }

    // await client.close();
    // return Promise.reject({
    //   message: "User not found",
    // });
  } catch (error) {
    reject(error);
    return Promise.reject(error);
  }
};

const updateUser = async (id, { name, lastName, surName }) => {
  const idUser = new ObjectId(id);
  const filterById = { _id: idUser };
  const client = new MongoClient(uri, {
    userNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const userCollection = client.db("users").collection("users");
    const existUser = await userCollection.findOne(filterById);
    if (existUser != null) {
      const updatedUser = await userCollection.findOneAndUpdate(
        { _id: idUser },
        {
          $set: {
            name,
            lastName,
            surName,
          },
        }
      );
      return Promise.resolve(updatedUser.value);
    }

    await client.close();
    return Promise.reject({
      message: "User not exist",
      userExistWithId: existUser._id,
    });
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

const deleteUser = async (id) => {
  const idUser = new ObjectId(id);
  const filterQry = { _id: idUser };

  const client = new MongoClient(uri, {
    userNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const userCollection = client.db("users").collection("users");
    const delUser = await userCollection.deleteOne(filterQry);
    if (delUser.deletedCount === 1) {
      console.log("User deleted successfully");
      console.log(delUser);
      return Promise.resolve(delUser);
    }

    await client.close();
    return Promise.reject({
      message: "Id not exist, impossible delete user",
    });
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

module.exports = { addUser, getAllUsers, findUser, updateUser, deleteUser };
