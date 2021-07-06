const bodyParser = require('body-parser');
const express = require('express');
const fetch = require('node-fetch');
const airtableAPIKey = process.env['AIRTABLE_APIKEY'];
let app = express();

app.use(bodyParser.json());

const port = 8080;

app.get('/getAirtableUsers', (req, res) => {
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
        const personsWhitEmail = persons.records.filter(({fields}) => fields.CorreoGFT)

        res.status(200).json({
            count: personsWhitEmail.length,
            data: personsWhitEmail 
        })
    })
})


// Server setup
app.listen(port, () => {
    console.log(`Estamos en el puerto: ${port}`);
});

module.exports = app;