"use strict";
const fetch = require("node-fetch");
const { endpoint, masterKey } = require("../config");

function readUser(req, res, next) {
  const url = `${endpoint}/Personas%20en%20el%20curso`;
  console.log(url);
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${masterKey}`,
    },
  })
    .then((response) => response.json())
    .then((resp) => {
      req.users = resp.records;
      next();
    });
}

function filterUsersWithEmail(req, res) {
  const users = req.users.filter((user) => user.fields["CorreoGFT"]);
  res.status(200).send({
    message: "success",
    count: users.length,
    data: users,
  });
}

module.exports = {
  readUser,
  filterUsersWithEmail,
};
