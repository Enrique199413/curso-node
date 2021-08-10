"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//Load routes
const { userRoutes } = require("./routes/users/user");
const { userFavorites } = require("./routes/favorites/favorite");
const { loginRouter } = require("./routes/login/login");

//middlewares

app.use(bodyParser.urlencoded({ extended: false }));
app.use((err, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETED,DELETE,OPTIONS"
  );
  res.header("Allow", "GET,POST,PUT,DELETED,DELETE,OPTIONS");
  next();
});
app.use(bodyParser.json());

//cors

//routes
app.use("/users", userRoutes);
app.use("/favorites", userFavorites);
app.use("/login", loginRouter);

//exports

module.exports = app;
