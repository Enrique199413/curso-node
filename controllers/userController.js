// CRUD - CREATE READ UPDATE DELETE

const fetch = require("node-fetch");
const AIRTABLE_APIKEY = process.env["AIRTABLE_APIKEY"];

const urlUsers = "https://api.airtable.com/v0/appgiwqXmBRiTiCXK/Personas%20en%20el%20curso"
const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${AIRTABLE_APIKEY}`
  }
}
const optionsUpdate = {
  method: "POST",
  headers: {
    Authorization: `Bearer ${AIRTABLE_APIKEY}`,
    "Content-Type": "application/json",
  }
}

const addUser = async (data) => {
  try {
    const responseUsers = await fetch(urlUsers,
      { ...optionsUpdate, body: JSON.stringify(data) }
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
  try {
    const responseUsersDelete = await fetch(
      `${urlUsers}?records[]=${id}`,
      { ...options, method: "DELETE" }
    );

    const deleteUser = await responseUsersDelete.json();

    return {
      data: deleteUser,
    };
  } catch (e) {
    res.status(404);
  }
};

const readUser = async () => {
  try {
    const responseUsers = await fetch(
      urlUsers,
      options
    );

    const allUsers = await responseUsers.json();

    return {
      count: allUsers.records.length,
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
