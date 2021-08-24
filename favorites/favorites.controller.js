const { MongoClient, ObjectId } = require("mongodb");
const { validateId, validateSpaces } = require("../utils/validators.utils");
const uri =
  process.env.MONGO_DB_URL ||
  "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/finalExam?retryWrites=true&w=majority";

const addFavorites = async ({ userId, spaceId }) => {

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    const error = await validateId({ userId, spaceId });
    if (error.error) {
      return Promise.reject(error.error.details[0].message);
    }
    const idUser = { _id: new ObjectId(userId) };
    const idSpace = { _id: new ObjectId(spaceId) };
    await client.connect();
    const spacesCollection = client.db("finalExam").collection("spaces");
    const usersCollection = client.db("finalExam").collection("users");
    const favoritesCollection = client.db("finalExam").collection("favorites");
    const user = await usersCollection.findOne(idUser);
    const space = await spacesCollection.findOne(idSpace);

    if (user && space) {
      const favoriteUserId = await favoritesCollection.findOne({
        userId,
      });

      if (favoriteUserId) {
        console.log("ENCONTRO USUARIO");
        console.log(favoriteUserId);

        console.log("ID a encontrar " + spaceId);
        const existFavorite = favoriteUserId.favorites.includes(spaceId);
        console.log(existFavorite);

        if (existFavorite) {
          return Promise.reject(
            "The user already set this favorite, please add another"
          );
        }
        // const idFav = await favoritesCollection.findOne(favoriteUserId._id);
        // console.log("FAVORITO" + JSON.stringify(idFav));

        const favorite = await favoritesCollection.findOneAndUpdate(
          { _id: favoriteUserId._id },
          {
            $push: {
              favorites: spaceId,
            },
          }
        );
        return Promise.resolve(favorite);
      }
      console.log("SE CREO NUEVO");
      const favorite = await favoritesCollection.insertOne({
        userId,
        favorites: [spaceId],
      });

      return Promise.resolve(favorite);
    }
    await client.close();
    return Promise.reject("User or space not found");
  } catch (error) {
    return Promise.reject("Insert corrects Id`s");
  }
};

const getFavorites = async () => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const favoritesCollection = client.db("finalExam").collection("favorites");
    const cursorFavorites = favoritesCollection.find({});
    const data = [];
    await cursorFavorites.forEach((element) => {
      data.push(element);
    });
    await client.close();
    return Promise.resolve(data);
  } catch (error) {
    reject(error);
    return Promise.reject(error);
  }
};

const getFavoritesUser = async (idUser) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    const userId = { _id: new ObjectId(idUser) };
    console.log(userId);
    await client.connect();
    const favoritesCollection = client.db("finalExam").collection("favorites");
    const favoriteUserId = await favoritesCollection.findOne({
      userId: idUser,
    });
    if (favoriteUserId) {
      if (favoriteUserId.favorites.length) {
        return Promise.resolve(favoriteUserId.favorites);
      }
      return Promise.resolve({ message: "IdUser doesn't have favorites yet" });
    }
    await client.close();
    return Promise.reject(
      "IdUser hasn't favorites please add one and try again"
    );
  } catch (error) {
    return Promise.reject(
      "IdUser hasn't favorites please add one and try again"
    );
  }
};

const updateFavoritesUser = async (idUser, spaceId) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    const spacesId = new Object(spaceId);
    await client.connect();
    const favoritesCollection = client.db("finalExam").collection("favorites");
    const favoriteUserId = await favoritesCollection.findOne({
      userId: idUser,
    });
    if (!spacesId.length)
      return Promise.reject({
        messagee:
          "List is empty if you delete list of favorites please use DELETE method",
      });

    if (favoriteUserId) {
      console.log(spaceId);
      const spacesCollection = client.db("finalExam").collection("spaces");
      const validSpaces = await Promise.all(
        await validateSpaces(spaceId, spacesCollection)
      ).then((item) => {
        return item;
      });
      console.log(validSpaces);
      if (validSpaces.includes(false)) {
        return Promise.reject({
          message: "Invalid spaces id, please verify and try again",
          value: validSpaces.map((item) => {
            return item === true ? "CorrectId" : "InvalalidId";
          }),
        });
      }
      const favorite = await favoritesCollection.findOneAndUpdate(
        { _id: favoriteUserId._id },
        {
          $set: {
            favorites: spaceId,
          },
        }
      );
      return Promise.resolve(favorite.value);
    }
    await client.close();
    return Promise.reject({
      message:
        "IdUser hasn't get favorites list, please add first and then try updated",
    });
  } catch (error) {
    return Promise.reject({
      message: "IdUser hasn't favorites please add one and try again",
    });
  }
};

const deleteFavoritesUser = async (idUser) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const favoritesCollection = client.db("finalExam").collection("favorites");
    const favoriteUserId = await favoritesCollection.findOne({
      userId: idUser,
    });

    console.log(favoriteUserId.favorites.length);

    if (favoriteUserId && favoriteUserId.favorites.length !== 0) {
      const favoriteDeleted = await favoritesCollection.findOneAndUpdate(
        { _id: favoriteUserId._id },
        {
          $set: {
            favorites: [],
          },
        }
      );
      return Promise.resolve(favoriteDeleted.value);
    }
    await client.close();
    return Promise.reject({
      message:
        "IdUser hasn't get favorites list, please add first and then try deleted",
    });
  } catch (error) {
    return Promise.reject({
      message: "IdUser hasn't favorites please add one and try again",
    });
  }
};

module.exports = {
  addFavorites,
  getFavorites,
  getFavoritesUser,
  updateFavoritesUser,
  deleteFavoritesUser,
};
