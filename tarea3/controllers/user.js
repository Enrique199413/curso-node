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

function readProgrammingLanguages(req, res, next) {
  const url = `${endpoint}/LenguajesProgramacion?maxRecords=3&view=Grid%20view`;
  console.log(url);
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${masterKey}`,
    },
  })
    .then((response) => response.json())
    .then((resp) => {
      req.languages = resp.records;
      next();
    });
}

function readUsersLanguages(req, res, next) {
  const url = `${endpoint}/PersonasLenguajes?maxRecords=3&view=Grid%20view`;
  console.log(url);
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${masterKey}`,
    },
  })
    .then((response) => response.json())
    .then((resp) =>
      res
        .status(200)
        .send({
          message: "success",
          data: req.users,
          languages: req.languages,
          usersLanguages: resp.records,
        })
    );
}

module.exports = {
  readUser,
  readProgrammingLanguages,
  readUsersLanguages,
};
