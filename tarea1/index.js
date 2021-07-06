const express = require('express')
const fetch = require('node-fetch')
const app = express()
const port = 8080
const airTableAPIkey = 'key30iKlvp6M1SGk0'


//JSON CON SOLO PERSONAS QUE TENGAN EMAIL
app.get('/getAirtableUsers', (req, res) => {
    if (!airTableAPIkey) {
        res.status(401).json({ error: 401 })
        return
    }
    let responseStatus = 200
    fetch('https://api.airtable.com/v0/appgiwqXmBRiTiCXK/Personas%20en%20el%20curso', { method: 'GET', headers: { 'Authorization': `Bearer ${airTableAPIkey}` } }).then(response => {
        if (response.status !== 200) {
            responseStatus = response.status
        }
        return response.json()
    }).then(persons => {
        const personsWithEmail = persons.records.filter(({ fields }) => fields.CorreoGFT)
        res.status(responseStatus).json({
            count: personsWithEmail.length,
            data: personsWithEmail
        })
    })
})


// Server setup
app.listen(port, () => {
    console.log(`Trabajando en el puerto ${port}`);
});

module.exports = app