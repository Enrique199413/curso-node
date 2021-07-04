const bodyParser = require('body-parser')
//const { response } = require('express')
const express = require('express')
const dotenv = require('dotenv').config()
const fetch = require('node-fetch')
let app = express()
//app.use(bodyParser.json())
const port = 8080
const AIRTABLE_API_KEY = process.env['AIRTABLE_API_KEY']

const authMiddleware = require('./middleware/auth')
const manageError = require('./middleware/manageError')

// Opcion 1
// const UserController = require('./controllers/userController').User
const {readUser, addUser, deleteUser} = require('./controllers/userController').User


// ejemplo middleware por APPLICATION
// el middleware agrega next a su estructura
app.use(authMiddleware)
//app.use(manageError)


//Indicaria las funciones que estan en el controller
//console.log(UserController)

app.get('/hola-mundo', (req, res) => {
    console.log('peticion')
    res.send('Hello World,.....................!')
})


app.get('/hola-mundo/suma', (req, res) => {
    console.log('suma')
    const {query: {a, b}} = req
    console.log(a, b)
    const sumando = parseInt(a, 10)
    const otroSumando = parseInt(b, 10)
    if (!isNaN(sumando) && !isNaN(otroSumando)) {
        const sum = parseInt(a, 10) + parseInt(b, 10)
        //res.send(`la suma de ${a} + ${b} es ${parseInt(a, 10) + parseInt(b, 10)}`)
        res.send(`la suma de ${a} + ${b} es ${sum}`)
    } else {
        res.status(200).json({
            message: `Por favor especifica valors numericos para la suma, ${a}, ${b}`,
            code: 400
        })
    }

    res.send('Hello World,.....................!')
})

// obtener las variables de entorno
// console.log(process.env)

// Validar el key, de la variable definida, para conectar air table
console.log(process.env['AIRTABLE_API_KEY'])

/**
 * Segunda Tarea
 * Personas en el curso Poder conectarse a airtable con sus credenciales GET de la tabla de usuarios

 Modificando el count y filtrando cuando no tenía correo Esperamos
 */
app.get('/getAitTableUsers', (req, res) => {
    console.log(process.env['AIR_TABLE_APIKEY'])

    if (!AIRTABLE_API_KEY) {
        //Error
        res.status({
            status: 404,
            message: `dddd`
        })
    }

    const url = 'https://api.airtable.com/v0/appgiwqXmBRiTiCXK/Personas%20en%20el%20curso'
    const option = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`
        }
    }


    let responseStatus = 200

    fetch(url, option).then(response => {
        // console.log(response)
        if (response.status != 200) {

        }
        return response.json()

    }).then(persons => {
        // console.log(persons)
        const personsWithEmail = persons.records.filter(({fields}) => fields.CorreoGFT)

        res.status(responseStatus).json({
            count: personsWithEmail.length,
            data: personsWithEmail
        })
    })


})


/**
 * Tercera Tarea
 * Realizar merge de 3 tablas:
 * - Personas en el curso,
 * - Lenguajes de programación,
 * - Personas Lenguajes
 */
app.get('/getAitTableUsers3', async (req, res) => {
    console.log(process.env['AIR_TABLE_APIKEY'])

    if (!AIRTABLE_API_KEY) {
        //Error
        res.status({
            status: 404,
            message: `dddd`
        })
    }
    const url = 'https://api.airtable.com/v0/appgiwqXmBRiTiCXK/Personas%20en%20el%20curso'
    const urlLenguajesTable = 'https://api.airtable.com/v0/appgiwqXmBRiTiCXK/LenguajesProgramacion'
    const urlPersonasLenguajes = 'https://api.airtable.com/v0/appgiwqXmBRiTiCXK/PersonasLenguajes'
    const option = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`
        }
    }

    //variables para guardar las peticiones
    let personasRq, lenguajesPErsonasRq

    let responseStatus = 200

    // Peticion 1: Lista de personas
    await fetch(url, option).then(response => {
        //console.log(response)
        if (response.status != 200) {

        }
        return response.json()

    }).then(persons => {

        personasRq = persons

    })

    // Peticion 2 Lista de relación, lenguajes personas
    await fetch(urlPersonasLenguajes, option).then(response => {
        console.log("respuesta lenguajes9")
        //console.log(response)
        if (response.status != 200) {

        }
        return response.json()

    }).then(languages => {
        // console.log(languages)
        lenguajesPErsonasRq = languages


    })

    // Peticion 3: Lista de lenguajes y hacer la logica
    await fetch(urlLenguajesTable, option).then(response => {
        console.log("respuesta solo lenguajes")
        //console.log(response)
        //console.log(response)
        if (response.status != 200) {

        }
        return response.json()

    }).then(languages => {
        const personWithLenguajes = personasRq.records.filter(({fields}) => fields.PersonasLenguajes)

        // todas las personas
        personWithLenguajes.map(persona => {
            persona.fields.PersonasLenguajes.map(idlenguajepersona => {

                //------------------
                const lenuajePersonaDomina = lenguajesPErsonasRq.records.find(element => element.id == idlenguajepersona)

                // Quitar/reemplazar el id
                persona.fields.PersonasLenguajes = []
                lenuajePersonaDomina.fields.LenguajesQueDomina.map(lenguajesQueDominaId => {
                    let objLenguaje = languages.records.find(element => element.id == lenguajesQueDominaId)

                    persona.fields.PersonasLenguajes.push(objLenguaje.fields.Name)

                })
            })

        })

        res.status(responseStatus).json({
            message: 'Lista de personas con correo de GFT y que tengan los lenguajes que dominan',
            count: personWithLenguajes.length,
            data: personWithLenguajes
        })


    })


})




app.listen(port, () => {
    console.log(`aqui estoy http://localhost:${port}`)
})



// para que la prueba tenga acceso
module.exports = app