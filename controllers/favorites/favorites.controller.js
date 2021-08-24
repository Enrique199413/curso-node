const { MongoClient } = require("mongodb");
var ObjectId = require("mongodb").ObjectID;

const uri =
  "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const getAllFavorites = async () => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const favCollection = client.db("finalExam").collection("favorites");
    const favoritesFind = favCollection.find({});
    const dataFavorites = [];
    favoritesFind.forEach((item) => {
      dataFavorites.push(item);
    });
    await client.close();
    return Promise.resolve(dataFavorites);
  } catch (e) {
    return Promise.reject(e);
  }
};

const addFavorite = async ({ id }) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const collectionUser = client.db("finalExam").collection("users");
    const collectionSpace = client.db("finalExam").collection("spaces");
    const favCollection = client.db("finalExam").collection("favorites");
    let filter = {
      _id: ObjectID(id).toString(),
    };
    const userId = await collectionUser.findOne(filter);
    const spaceID = await collectionSpace.findOne(filter);
    const favoriteArr = [];
    favoriteArr.push(spaceID);
    const favoritesOfUser = await favCollection.insertOne({
      userId,
      favoriteArr,
    });
    await client.close();
    return Promise.resolve(favoritesOfUser);
  } catch (e) {
    return Promise.reject(e);
  }
};

const getFavorite = async ({ userId }) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const favCollection = client.db("finalExam").collection("favorites");
    const favoritesUser = await favCollection.findOne({ userId: userId });
    await client.close();
    return Promise.resolve(favoritesUser);
  } catch (e) {
    return Promise.reject(e);
  }
};

const updateFavorite = async ({ userId, favorites }) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const favCollection = client.db("finalExam").collection("favorites");
    const updateFavoriteUser = await favCollection.updateOne(
      { userId: userId },
      { $set: { favorites: favorites } }
    );
    await client.close;
    return Promise.resolve(updateFavoriteUser);
  } catch (e) {
    return Promise.reject(e);
  }
};

const deleteFavorite = async ({ userId, favorites }) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const favCollection = client.db("finalExam").collection("favorites");
    const deleteFavoriteUser = await favCollection.deleteOne(
      { userId: userId },
      { $unset: { favorites: favorites } }
    );
    await client.close;
    return Promise.resolve(deleteFavoriteUser);
  } catch (e) {
    return Promise.reject(e);
  }
};
module.exports = {
  getAllFavorites,
  addFavorite,
  updateFavorite,
  deleteFavorite,
};
