const bodyParser = require('body-parser')
const express = require('express')
const dotenv = require('dotenv').config()
const fetch = require('node-fetch')
const errorCode = require('./test/mock/errorCodes')
const { createUser, deleteUser, readUsers } = require('./controllers/crudController').User

console.log(fetch);
let app = express()
app.use(bodyParser.json())
const port = 8081

const allUrl = 'https://api.airtable.com/v0/appY2q7yIwLmh5mrh/Personas%20en%20el%20curso'
const lpUrl = 'https://api.airtable.com/v0/appY2q7yIwLmh5mrh/LenguajesProgramacion'
const plUrl = 'https://api.airtable.com/v0/appY2q7yIwLmh5mrh/PersonasLenguajes'

app.get('/hola-mundo/suma', (req, res) => {
    
    const {query: {a, b}} = req
    const sumando = parseInt(a,10)
    const otroSumando = parseInt(b,10);
    if(!isNaN(sumando) && !isNaN(otroSumando)) {
        res.send(`La suma de ${a} + ${b} es ${sumando + otroSumando}`)
    } else {
        res.status(400).json(errorCode.errorWhenIsNotNumeric(a,b))
    }
    
})
/**
 * Tarea 2
 */
app.get('/airTable/allUsers', (req,res) => {
    
    const airtableAPIKey = process.env.AIRTABLE_APIKEY
    console.log(airtableAPIKey)
    if(!airtableAPIKey){
        res.status(401).json({code:401});
    }
    const url = 'https://api.airtable.com/v0/appgiwqXmBRiTiCXK/Personas%20en%20el%20curso'
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${airtableAPIKey}`
        }
    }
    let responseStatus = 200;
    fetch(url, options).then(response => {
        if (response.status !=200 ) {
            responseStatus = response.status;
        }
        return response.json()
    }).then(persons => {
        personsWhitEmail = persons.records.filter(({fields}) => fields.CorreoGFT)
        console.log(personsWhitEmail)
        res.status(responseStatus).json({
            count: personsWhitEmail.length,
            data: personsWhitEmail
        })
    }).catch(error => {
        console.log("ERROR")
        console.log(error)
        res.status(400).json(errorCode.errorWhenFetchingAll)
    });
})
/** Fin Tarea 2 */

/**
 * Tarea 3
 */
 app.get('/airTable/allUsers/merge', (req,res) => {
    
    const airtableAPIKey = process.env.AIRTABLE_APIKEY_MAC
    console.log(airtableAPIKey)
    if(!airtableAPIKey){
        res.status(401).json({code:401});
    }
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${airtableAPIKey}`
        }
    }
    let responseStatus = 200;
    Promise.all([
        fetch(allUrl, options),
        fetch(plUrl, options),
        fetch(lpUrl, options)
    ]).then(responses => {
        return Promise.all(responses.map((response) => {
            return response.json();
        }));
    }).then(data => {
        let personsInCourse = data[0].records;
        const personsLanguages = data[1].records;
        const programingLanguages = data[2].records;
        let personasArray;
        let updatedPerson = [];
        let descLanguages = [];
        personsInCourse.forEach(element => {
            personasArray = element;
            if(personasArray.fields.PersonasLenguajes) {
                console.log("Validando personasLenguajes")
                console.log(personasArray.fields.Name)
                personasArray.fields.PersonasLenguajes.forEach(perLenId => {
                    console.log("comparando ids");
                    personsLanguages.forEach(pl => { 
                        if(perLenId == pl.id){
                            console.log(pl.fields.LenguajesQueDomina);
                            descLanguages = new Array();
                            pl.fields.LenguajesQueDomina.forEach(languagesId => {
                                console.log(languagesId)
                                programingLanguages.forEach(descLang => {
                                    if(languagesId==descLang.id) {
                                        descLanguages.push(descLang.fields.Name)
                                        console.log(descLang.fields.Name);
                                    }
                                })
                                console.log(descLanguages);
                            })
                        }
                    })
                })
                personasArray.fields.PersonasLenguajes = descLanguages;
            }
            updatedPerson.push(personasArray);
        });
        console.log(updatedPerson)
        res.status(responseStatus).json({
            count: updatedPerson.length,
            data: updatedPerson
        })

    }).catch(error => {
        console.log("ERROR")
        console.log(error)
        res.status(400).json(errorCode.errorWhenFetchingAll)
    });
})
/** Fin Tarea 3 */


/**
 * Tarea 4
 */
app.post('/airTable/users/add', async (req, res) => {
    //console.log(req.body)
    const inputBody = req.body
    const data = {
        "records": [inputBody]
    }
    
    try {
        const userCreated = await createUser(data)
        console.log('SUCCESS', userCreated)
        res.status(200).json(userCreated)
    } catch (e) {
        console.log('ERROR')
        res.status(400).json(JSON.stringify(e))
    }
})

app.delete('/airTable/users/delete/:id', async(req, res) => {
    try {
        const paramId = req.params.id;
        console.log(paramId)
        const resDeleted = await deleteUser(req.params.id)
        console.log('SUCCESS', resDeleted)
        res.status(200).json(resDeleted)
    } catch (e) {
        console.log('ERROR')
        res.status(400).json(JSON.stringify(e))
    }
})
/**** Fin tarea 4*/

app.listen(port, () => {
    console.log(`Example app listening at http://localhost: ${port}`)
})

module.exports = app;