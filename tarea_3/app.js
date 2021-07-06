const bodyParser = require('body-parser');
const express = require('express');
const fetch = require('node-fetch');
const airtableAPIKey = process.env['AIRTABLE_APIKEY'];
let app = express();

app.use(bodyParser.json());

const port = 8080;

/* Tarea 3 */
app.get('/getAirtableUsersLenguaje', (req, res) => {
    const url = 'https://api.airtable.com/v0/appgiwqXmBRiTiCXK/Personas%20en%20el%20curso'
    const url1 = 'https://api.airtable.com/v0/appgiwqXmBRiTiCXK/LenguajesProgramacion?fields%5B%5D=Name&fields%5B%5D=PersonasLenguajes&filterByFormula=NOT%28%7BPersonasLenguajes%7D%20%3D%20%27%27%29'
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${airtableAPIKey}`
        }
    }
    let personsWhitEmail;
    let responseStatus = 200;

    function findName (datas, id) {
        let lenguajes = [];
        datas.forEach(data => {
            if (data.fields.PersonasLenguajes.find(element => element === id)) {
                lenguajes.push(data.fields.Name)
            }
        });
        return lenguajes;
    }

    fetch(url, options).then(response => {
        if (response.status !=200 ) {
            responseStatus = response.status;
        }
        return response.json()
    }).then(persons => {
        personsWhitEmail = persons.records.filter(({fields}) => fields.CorreoGFT)
        fetch(url1, options).then(response => {
            if (response.status !=200 ) {
                responseStatus = response.status;
            }
            return response.json()
        }).then(lenguajes => {
            personsWhitEmail.map((persons) => {
                if (persons.fields.PersonasLenguajes) {
                    persons.fields.PersonasLenguajes = findName(lenguajes.records, persons.fields.PersonasLenguajes[0])
                }
            });
    
            res.status(200).json({
                data: personsWhitEmail
            })
        })
    })
})
/* Tarea 3 */

  
// Server setup
app.listen(port, () => {
    console.log(`Estamos en el puerto: ${port}`);
});

module.exports = app;