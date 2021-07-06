"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const { port } = require('./config');
console.log(`Your port is ${port}`); // 8626

//Load routes
let user_routes = require("./routes/user");

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
app.use("/api", user_routes);

//exports

module.exports = app;