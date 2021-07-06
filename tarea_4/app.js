const bodyParser = require('body-parser');
const express = require('express');
const fetch = require('node-fetch');
const airtableAPIKey = process.env['AIRTABLE_APIKEY'];
let app = express();
const { addUser, deleteUser, readUser } = require('./controllers/userController').User

app.use(bodyParser.json());

const port = 8080;


/* Tarea 4 */
app.get('/users/all', async(req, res) => {
    try {
        const allUsers = await readUser()
        console.log('SUCCESS', allUsers)
        res.status(200).json(allUsers)
    } catch (e) {
        console.log('ERROR')
        res.status(400).json(JSON.stringify(e))
    }
})

app.post('/users/add', async (req, res) => {
    const data = {
        "records": [
          {
            "fields": {
              "Name": "test Rafael",
              "Apellido": "Ayala",
              "CorreoGFT": "iaaf@gft.com",
              "Cliente": "Santander"
            }
          }
        ]
      }
    try {
        const allUsers = await addUser(data)
        console.log('SUCCESS', allUsers)
        res.status(200).json(allUsers)
    } catch (e) {
        console.log('ERROR')
        res.status(400).json(JSON.stringify(e))
    }
})

app.delete('/users/delete/:id', async(req, res) => {
    try {
        const resp = await deleteUser(req.params.id)
        console.log('SUCCESS', resp)
        res.status(200).json(resp)
    } catch (e) {
        console.log('ERROR')
        res.status(400).json(JSON.stringify(e))
    }
})
/* Fin Tarea 4 */
  
// Server setup
app.listen(port, () => {
    console.log(`Estamos en el puerto: ${port}`);
});

module.exports = app;