"use strict";
const fetch = require("node-fetch");
const { endpoint, masterKey } = require("../config");

function readUser(req, res) {
  const url = `${endpoint}/Personas%20en%20el%20curso`;
  console.log(url);
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${masterKey}`,
    },
  })
    .then((response) => response.json())
    .then((resp) => res.status(200).send({ message: "success", resp }));
}

module.exports = {
  readUser,
};
