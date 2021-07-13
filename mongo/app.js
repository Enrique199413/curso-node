const bodyParser = require('body-parser');
const express = require('express');
const { usersRouter } = require('./users/users.router')
let app = express();

app.use(bodyParser.json());

const port = 8080;
 
app.use('/users', usersRouter)

  
// Server setup
app.listen(port, () => {
    console.log(`Estamos en el puerto: ${port}`);
});

module.exports = app;