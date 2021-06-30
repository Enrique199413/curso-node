'use strict'
const airtableApi = require('../apis/airtable-api')

// Get all users
exports.getUsers = async (req, res) => { 
  const personasEnElCurso = await getPersonasEnElCurso()
  const lenguajesProgramacion = await getLenguajesProgramacion()
  //TODO merge information

  const users = personasEnElCurso
  res.status(200).json({
    usersCount: users.length,
    users: users,
  }) 
}

const getPersonasEnElCurso = async () => {
  const rawPersonasEnElCurso = await airtableApi.getPersonasEnElCurso().catch(console.error)
  // TODO: manage error response
  return rawPersonasEnElCurso.map(persona => ({id: persona.id, ...persona.fields,}))
}

const getLenguajesProgramacion = async () => {
  const rawLenguajesProgramacion = await airtableApi.getLenguajesProgramacion().catch(console.error)
  // TODO: manage error response
  return rawLenguajesProgramacion.map(lenguaje => ({ id: lenguaje.id, ...lenguaje.fields }))
}

// Add new user
exports.addUser = async (req, res) => {
  const addedUser = await airtableApi.postPersonaEnElCurso({}).catch(console.error)
  res.status(201).json(addedUser) 
}
