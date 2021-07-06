const express = require('express');
let app = express();
const manageErrors = require('./middlewares/manageErros')
const personsLanguageRoutes = require('./routers/personsLanguage.router')


app.use('/persons',manageErrors, personsLanguageRoutes)

const port = 8080;

// Server setup
app.listen(port, () => {
    console.log(`Estamos en el puerto: ${port}`);
});

module.exports = app;