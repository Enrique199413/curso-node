const bodyParser = require("body-parser");
const express = require("express");
//const passport = require("passport");
//require("./auth")(passport);
require("dotenv").config();
const setupAuthMiddleware = require("./middlewares/index");

if (process.env.NODE_ENV === "development") {
  process.env.MONGO_DB_URL = "mongodb://localhost:27017/test";
} else {
  process.env.MONGO_DB_URL =
    "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/finalExam?retryWrites=true&w=majority";
}

const { registerRouter } = require("./register/register.router");
const { loginRouter } = require("./login/login.router");
const { usersRouter } = require("./users/users.router");
const { spacesRouter } = require("./spaces/spaces.router");
const { favoritesRouter } = require("./favorites/favorites.router");

let app = express();
setupAuthMiddleware(app);
app.use(bodyParser.json());
//app.use(passport.initialize());

app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/spaces", spacesRouter);
app.use("/api/favorites", favoritesRouter);

const port = 8080;

app.listen(port, () => {
  console.log("server on port 8080");
});

module.exports = app;
