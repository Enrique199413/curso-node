const express = require('express')
const fetch = require('node-fetch')
const app = express()
const port = 8080
const airTableAPIkey = 'key30iKlvp6M1SGk0'


app.get('/getTablesPersons', (req, res) => {
    fetch('https://api.airtable.com/v0/appgiwqXmBRiTiCXK/LenguajesProgramacion', { method: 'GET', headers: { 'Authorization': `Bearer ${airTableAPIkey}` } }).then(response => {
            return response.json()
        }).then(lenguages => {
            const allLenguages = lenguages.records.filter(({ fields }) => fields.PersonasLenguajes)
            allLenguages.map((lenguagePerson) => {
                lenguagePerson.fields.PersonasLenguajes
                console.log(personasLenguajesId)
            })
            res.status(200).json({
                id: allLenguages
            })
        })
        // .then()
        // fetch('https://api.airtable.com/v0/appgiwqXmBRiTiCXK/Personas%20en%20el%20curso', { method: 'GET', headers: { 'Authorization': `Bearer ${airTableAPIkey}` } }).then(response => {
        //     return response.json()
        // }).then(lenguagePerson => {
        //     const personasLenguajes = lenguagePerson.records.filter(({ fields }) => fields.PersonasLenguajes)
        //     personasLenguajes.map((persons) => {
        //         const personasLenguajesId = persons.fields.PersonasLenguajes
        //         console.log(personasLenguajesId)
        //         return personasLenguajesId
        //     })
        //     res.status(200).json({ data: personasLenguajes })
        // }).then()


})

app.get('/getTablesPrograming', (req, res) => {
    fetch('https://api.airtable.com/v0/appgiwqXmBRiTiCXK/LenguajesProgramacion', { method: 'GET', headers: { 'Authorization': `Bearer ${airTableAPIkey}` } }).then(response => {
        return response.json()
    }).then(lenguages => {
        const allLenguages = lenguages.records.filter(({ fields }) => fields.PersonasLenguajes)
        return res.status(200).json({
            id: allLenguages
        })
    }).then()
})

app.get('/getPersonsLenguages', (req, res) => {
    fetch('https://api.airtable.com/v0/appgiwqXmBRiTiCXK/PersonasLenguajes', { method: 'GET', headers: { 'Authorization': `Bearer ${airTableAPIkey}` } }).then(response => {
        return response.json()
    }).then(lenguagespersons => {
        const lenguagesPersons = res.status(200).json(lenguagespersons)
        console.log(lenguagesPersons)
        return lenguagesPersons
    })
})


// Server setup
app.listen(port, () => {
    console.log(`Trabajando en el puerto ${port}`);
});

module.exports = app