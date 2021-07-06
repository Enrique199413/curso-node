"use strict";

const express = require("express");
const userCtrl = require("../controllers/user");

let api = express.Router();

api.get("/users", userCtrl.readUser,userCtrl.filterUsersWithEmail);

module.exports = api;
