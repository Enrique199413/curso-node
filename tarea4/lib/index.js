const express = require('express')
const app = express()
const port = 8080
const personsLanguageRoutes = require('./../routes/personsLenguage.routes')

app.use('/persons', personsLanguageRoutes)

// Server setup
app.listen(port, () => {
    console.log(`Trabajando en el puerto ${port}`);
});

module.exports = app