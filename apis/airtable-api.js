'use strict'
const axios = require('axios')

const axiosInstance = axios.create({ baseURL: 'https://api.airtable.com/v0/appgiwqXmBRiTiCXK' })
axiosInstance.defaults.headers.common = { Authorization: `Bearer keyulOKX43iT9G967` }

exports.getPersonasEnElCurso = async () => {
  const response = await axiosInstance.get('/Personas%20en%20el%20curso')
  console.log('getPersonasEnElCurso::', response.data)
  return response.data.records
}

exports.getLenguajesProgramacion = async () => {
  const response = await axiosInstance.get('/LenguajesProgramacion')
  console.log('getLenguajesProgramacion::', response.data)
  return response.data.records
}
