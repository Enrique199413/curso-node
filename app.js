const bodyParser = require("body-parser");
const express = require("express");
const passport = require("passport");
require("./auth")(passport);
require("dotenv").config();
const setupAuthMiddleware = require("./middlewares/index");

if (process.env.NODE_ENV === "development") {
  process.env.MONGO_DB_URL = "mongodb://localhost:27017/test";
} else {
  process.env.MONGO_DB_URL =
    "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
}

const { userRouter } = require("./users/users.router");
const { loginRouter } = require("./login/login.router");

let app = express();
//setupAuthMiddleware(app);
app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/users", userRouter);
app.use("/login", loginRouter);

const port = 8080;

app.listen(port, () => {
  console.log("server on port 8080");
});

module.exports = app;
