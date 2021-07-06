"use strict";
const fetch = require("node-fetch");
const { endpoint, masterKey } = require("../config");


function addUser(req,res){
  const url = `${endpoint}/Personas%20en%20el%20curso`;
  let params=req.body
  const data = {
    "records": [
      {
        "fields": {
          "Name": params.name,
          "Apellido": params.apellido,
          "CorreoGFT": params.email,
          "Cliente": params.cliente
        }
      }
    ]
  }
  console.log(url);
  fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${masterKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((resp) => res.status(200).send({ message: "success", resp }));
}
function deleteUser(req,res){
  const userId=req.params.id;
  console.log('user> ',userId)
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
  addUser,
  deleteUser,
};
