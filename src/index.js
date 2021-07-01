const bodyParser = require("body-parser");
const express = require("express");
const fetch = require("node-fetch");
const AIRTABLE_APIKEY = process.env["AIRTABLE_APIKEY"];
let app = express();
const { addUser, deleteUser, readUser } =
  require("../controllers/userController").User;
app.use(bodyParser.json());
const port = 4000;

const url =
  "https://api.airtable.com/v0/appgiwqXmBRiTiCXK/Personas%20en%20el%20curso";

const urlLanguages =
  "https://api.airtable.com/v0/appgiwqXmBRiTiCXK/LenguajesProgramacion?fields%5B%5D=Name&fields%5B%5D=PersonasLenguajes&filterByFormula=NOT%28%7BPersonasLenguajes%7D%20%3D%20%27%27%29";

app.get("/hola-mundo/suma", (req, res) => {
  const {
    query: { a, b },
  } = req;
  const num1 = parseInt(a, 10);
  const num2 = parseInt(b, 10);
  if (!isNaN(num1) && !isNaN(num2)) {
    res.send(`La suma de ${a} + ${b} es ${num1 + num2}`);
  } else {
    res.status(400).json({
      message: `Especifica valores númericos para la suma, ${a}, ${b}`,
      code: 400,
    });
  }
});

app.get("/getAirtableUsers", (req, res) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${AIRTABLE_APIKEY}`,
    },
  };
  let responseStatus = 200;
  fetch(url, options)
    .then((response) => {
      if (response.status != 200) {
        responseStatus = response.status;
      }
      return response.json();
    })
    .then((persons) => {
      const personsWhitEmail = persons.records.filter(
        ({ fields }) => fields.CorreoGFT
      );

      res.status(200).json({
        count: personsWhitEmail.length,
        data: personsWhitEmail,
      });
    });
});

app.get("/getAirtableUsersLenguaje", (req, res) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${AIRTABLE_APIKEY}`,
    },
  };
  let personsWhitEmail;
  let responseStatus = 200;

  function findName(datas, id) {
    let lenguajes = [];
    datas.forEach((data) => {
      if (data.fields.PersonasLenguajes.find((element) => element === id)) {
        lenguajes.push(data.fields.Name);
      }
    });
    return lenguajes;
  }

  fetch(url, options)
    .then((response) => {
      if (response.status != 200) {
        responseStatus = response.status;
      }
      return response.json();
    })
    .then((persons) => {
      personsWhitEmail = persons.records.filter(
        ({ fields }) => fields.CorreoGFT
      );
      fetch(urlLanguages, options)
        .then((response) => {
          if (response.status != 200) {
            responseStatus = response.status;
          }
          return response.json();
        })
        .then((lenguajes) => {
          personsWhitEmail.map((persons) => {
            if (persons.fields.PersonasLenguajes) {
              persons.fields.PersonasLenguajes = findName(
                lenguajes.records,
                persons.fields.PersonasLenguajes[0]
              );
            }
          });

          res.status(200).json({
            data: personsWhitEmail,
          });
        });
    });
});

app.get("/users/all", async (req, res) => {
  try {
    const allUsers = await readUser();
    console.log("SUCCESS", allUsers);
    res.status(200).json(allUsers);
  } catch (e) {
    console.log("ERROR");
    res.status(400).json(JSON.stringify(e));
  }
});

app.post("/users/add", async (req, res) => {
  const data = {
    records: [
      {
        fields: {
          Name: "test Rafael",
          Apellido: "Ayala",
          CorreoGFT: "iaaf@gft.com",
          Cliente: "Santander",
        },
      },
    ],
  };
  try {
    const allUsers = await addUser(data);
    console.log("SUCCESS", allUsers);
    res.status(200).json(allUsers);
  } catch (e) {
    console.log("ERROR");
    res.status(400).json(JSON.stringify(e));
  }
});

app.delete("/users/delete/:id", async (req, res) => {
  try {
    const resp = await deleteUser(req.params.id);
    console.log("SUCCESS", resp);
    res.status(200).json(resp);
  } catch (e) {
    console.log("ERROR");
    res.status(400).json(JSON.stringify(e));
  }
});

app.listen(port, () => {
  console.log(`Server on port: ${port}`);
});

module.exports = app;
