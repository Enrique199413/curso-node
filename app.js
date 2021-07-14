/*
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
*/

const bodyParser = require('body-parser')
const express = require('express');
const passport = require('passport')
const { Logger } = require('mongodb');
const fetch = require('node-fetch')
require('dotenv').config();
let app = express()
app.use(bodyParser.json())
const port = 8000
const AIRTABLE_APIKEY = process.env.AIRTABLE_APIKEY
const {addUser, updateUser, deleteUser, readUser} = require('./controllers/userController').User
const authMiddleware = require('./middlewares/auth')
const manageErros = require('./middlewares/manageErrors')
const {usersRouter} = require('./users/users.router')

const session = require("express-session")


app.use(session({ secret: "nodegft" }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(passport.session());

//app.use(manageErros)
//app.use(authMiddleware)

app.use('/users', usersRouter)





app.get('/hola-mundo/suma',(req,res) => {
  //console.log()
  const {query: {a,b}} = req
  const sumando = parseInt(a,10)
  const otroSumando = parseInt(b,10)
  if(!isNaN(sumando) && !isNaN(otroSumando) ) {
    res.send(`La suma de ${a} + ${b} es ${sumando + otroSumando}`)
  } else {
    res.status(200).json({
      message: `por favor especifica valores númericos para la suma, ${a}, ${b}`,
      code: 400
    })
  }
  
})

app.get('/getAirtableUsers',(req,res) => {
  const airtableAPIKey = process.env.AIRTABLE_APIKEY
  const urlPersonas = 'https://api.airtable.com/v0/appgiwqXmBRiTiCXK/Personas%20en%20el%20curso?view=Grid%20view'
  const urlLenguajes = 'https://api.airtable.com/v0/appgiwqXmBRiTiCXK/LenguajesProgramacion'
  const urlPersonasLeng = 'https://api.airtable.com/v0/appgiwqXmBRiTiCXK/PersonasLenguajes'
  if(!airtableAPIKey) {
    res.status(401).json({code:401})
  }
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${airtableAPIKey}`
    }
  }
  let responseStatus = 200

  /*
    fetch(url, options).then(response => {
      if(response.status !== 200) {
        responseStatus = response.status
      }
      return response.json()
    }).then(persons => {
      const personWithEmail = persons.records.filter(({fields}) => fields.CorreoGFT)
      
      res.status(responseStatus).json({
        count: personWithEmail.length,
        data: personWithEmail
      })
    })*/
  
  //Obtenermos personas
  const personsList = fetch(urlPersonas, options).then(response => {
    if(response.status !== 200) {
      responseStatus = response.status
    }
    return response.json()
  })

  //Obtenemos Lenguajes
  const languagesList = fetch(urlLenguajes, options).then(response => {
    if(response.status !== 200) {
      responseStatus = response.status
    }
    return response.json()
  })

  //Obtenemos personas/lenguajes
  const personsLanguagesList= fetch(urlPersonasLeng, options).then(response => {
    if(response.status !== 200) {
      responseStatus = response.status
    }
    return response.json()
  })

  var listRelation = new Array
  
  personsList.then(persons => {   

    personsLanguagesList.then(dataPersonsLang => {

      languagesList.then(dataLanguages => {
        for (const iteratorDataPersonsLang of dataPersonsLang.records) {
          const list = iteratorDataPersonsLang.fields.LenguajesQueDomina
          const item = {
            'PersonasLenguajes': iteratorDataPersonsLang.id,
            'listLanguages':[]
          }
          for (const iteratorLenguajesQueDomina of list) {
            const elementFound = dataLanguages.records.find(element => element.id === iteratorLenguajesQueDomina)
            item.listLanguages.push(elementFound.fields.Name)
          }
          listRelation.push(item)
        }

        const responseJson = new Array
        
        for (const iteratorPersons of persons.records) {

          if (iteratorPersons.fields.PersonasLenguajes === undefined) {
            responseJson.push(iteratorPersons)
          } else {
            for (const iteratorRelation of listRelation) {
              if(iteratorPersons.fields.PersonasLenguajes == iteratorRelation.PersonasLenguajes) {
                const objectResponse = {
                  "id": "",
                  "fields": {
                    "Name": "",
                    "Cliente": "",
                    "4letras": "",
                    "Apellido": "",
                    "CorreoGFT":"",
                    "Lenguajes": []
                  },
                  "createdTime": ""
                }
                
                objectResponse.id = iteratorPersons.id
                objectResponse.fields.Name = iteratorPersons.fields.Name
                objectResponse.fields.Cliente = iteratorPersons.fields.Cliente
                objectResponse.fields['4letras'] = iteratorPersons.fields['4letras']
                objectResponse.fields.Apellido = iteratorPersons.fields.Apellido
                objectResponse.fields.CorreoGFT = iteratorPersons.fields.CorreoGFT
                objectResponse.fields.LenguajesQueDomina = iteratorRelation.listLanguages
                objectResponse.createdTime = iteratorPersons.createdTime
                responseJson.push(objectResponse)
              }
            }
          }
        }
        res.status(responseStatus).json({
          count: responseJson.length,
          data: responseJson
        })

      })
    })
  })
})

app.get('/user/allUsers', async (req, res) => {
  try {
    const allUsers = await readUser()
    res.status(200).json(allUsers)
  } catch (e) {
    console.log('Error')
  }

})

app.post('/user/createUser', async (req, res) => {
  try {
    const allUsers = await addUser(req.body)
    res.status(200).json(allUsers)
  } catch (e) {
    console.log('Error')
  }
})

app.delete('/user/deleteUser/:id', async (req, res) => {
  try {
    const allUsers = await deleteUser(req.params.id)
    res.status(200).json(allUsers)
  } catch (e) {
    console.log('Error')
  }
})


app.use((req,res, next) => {
  console.log('Entro', Date.now())
  next()
})
//RUTA
app.get('/user/all', (req, res, next) => {

  //todo lo que se necesitaba y constinua al sig paso
  //console.log('estoy en el middleware')
  //res.json({info: 'pasa por el middleware'})
  try {
    throw new Error('Algo sale mal ...')
  } catch (error) {
    next(error)
  }

}, (req, res) => {
  //negocio
  res.status(200).json({info: 'todo ok'})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;