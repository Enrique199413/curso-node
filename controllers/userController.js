// CRUD - CREATE READ UPDATE DELETE

const fetch = require("node-fetch");
const airtableAPIKey = process.env["AIRTABLE_APIKEY"];

const addUser = async (data) => {
  //todo add user data
  try {
    const responseUsers = await fetch(
      "https://api.airtable.com/v0/appgiwqXmBRiTiCXK/Personas%20en%20el%20curso",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${airtableAPIKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const resp = await responseUsers.json();
    return resp;
  } catch (e) {
    res.status(404);
  }
};

const updateUser = () => {
  //todo update user
};

const deleteUser = async (id) => {
  //todo delete user
  try {
    const responseUsersDelete = await fetch(
      `https://api.airtable.com/v0/appgiwqXmBRiTiCXK/Personas%20en%20el%20curso?records[]=${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${airtableAPIKey}`,
        },
      }
    );

    const allUsers = await responseUsersDelete.json();

    return {
      data: allUsers,
    };
  } catch (e) {
    res.status(404);
  }
};

const readUser = async (count) => {
  //todo read user
  try {
    const responseUsers = await fetch(
      "https://api.airtable.com/v0/appgiwqXmBRiTiCXK/Personas%20en%20el%20curso",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${airtableAPIKey}`,
        },
      }
    );

    const allUsers = await responseUsers.json();

    return {
      count: count,
      data: allUsers.records,
    };
  } catch (e) {
    res.status(404);
  }
};

module.exports.User = {
  addUser,
  updateUser,
  deleteUser,
  readUser,
};
