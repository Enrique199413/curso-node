"use strict";

const express = require("express");
const userCtrl = require("../controllers/user");

let api = express.Router();

api.get("/user", userCtrl.deleteUser);
api.post("/users/add", userCtrl.addUser);

module.exports = api;
