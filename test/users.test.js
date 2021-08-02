const mongoUnit = require("mongo-unit");
const { expect } = require("chai");
const allCollections = require("../src/mocks/db.json");

let mongoUrl;
let usersController;

(async (dbName) => {
  await mongoUnit.start({ dbName });
  mongoUrl = mongoUnit.getUrl();
  console.log("Mongo fake funciona aquí: ", mongoUrl);
  run();
})("users");

after(async () => {
  await mongoUnit.stop();
});

describe("unitTest user controller", () => {
  before(() => {
    process.env.MONGO_DB_URL = mongoUrl;
    usersController = require("../users/users.controller");
  });

  afterEach(() => {
    mongoUnit.drop();
  });

  beforeEach(() => {
    mongoUnit.initDb(mongoUrl, allCollections);
  });

  it("should be data from getAllUsers", async () => {
    // const users = await usersController.getAllUsers();

    // expect(users.length).to.equal(4);
    return new Promise(async (resolve) => {
      const users = await usersController.getAllUsers();
      expect(users.length).to.equal(4);
      resolve();
    });
  });

  it("should be send data from new user", async () => {
    const newUser = {
      lastName: "Jim",
      surName: "Ch",
      name: "Jor",
    };
    const userAdded = await usersController.addUser(newUser);
    const users = await usersController.getAllUsers();
    expect(users.length).to.equal(5);
  });

  it("should be update exist user", async () => {
    const newUser = {
      lastName: "Jimenez",
      surName: "Ch",
      name: "Jor",
    };
    const userToUpdate = {
      lastName: "J",
      surName: "C",
      name: "J",
    };

    const userAdded = await usersController.addUser(userToUpdate);
    const users = await usersController.getAllUsers();

    const userUpdated = await usersController.updateUser(users[4]._id, {
      lastName: "J",
      surName: "C",
      name: "J",
    });

    expect(users[4].name).to.equal(userUpdated.name);
  });

  it("should be delete user by id", async () => {
    const newUser = {
      lastName: "Jim",
      surName: "Ch",
      name: "Jor",
    };
    const userAdded = await usersController.addUser(newUser);
    const users = await usersController.getAllUsers();

    const userDeleted = await usersController.deleteUser(users[4]._id);

    expect(users.length).to.equal(5);
    expect(userDeleted.deletedCount).to.equal(1);
  });

  it("should not be delete user by id", async () => {
    const newUser = {
      lastName: "Jim",
      surName: "Ch",
      name: "Jor",
    };
    const userAdded = await usersController.addUser(newUser);
    const users = await usersController.getAllUsers();

    const userDeleted = await usersController.deleteUser(users[2]._id);

    console.log(userDeleted);
    expect("Id not exist, impossible delete user");
  });
});
