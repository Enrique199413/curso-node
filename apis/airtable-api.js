'use strict'
const axios = require('axios')

const axiosInstance = axios.create({ baseURL: 'https://api.airtable.com/v0/appgiwqXmBRiTiCXK' })
axiosInstance.defaults.headers.common = { Authorization: `Bearer keyulOKX43iT9G967` } 
// TODO: get apikey from environment variables

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

exports.postPersonaEnElCurso = async (personaEnElCurso) => {
  const request = {
    records:[
      {
        fields:{
          Name:"Ric",
          Apellido:"Sarabia",
          Cliente:"Santander",
          "4letras":"ROSB2"
        }
      }
    ]
  }
  const response = await axiosInstance.post('/Personas%20en%20el%20curso', request)
  console.log('postPersonaEnElCurso::', response.data)
  return response.data.records  
}
