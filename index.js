const express = require('express');
const { loginRouter } = require('./login/login.router')
const { favoritesRouter } = require('./favorites/favorites.router')
const { spacesRouter } = require('./spaces/spaces.router')
const { usersRouter } = require('./users/users.router')
const mongoose = require('mongoose');
const { authRouter } = require('./login/auth')
const config = require('config');
const uri = config.get('Mongo.uriConfig.uri')

const app = express();
const port = 8085;

console.log('Application: ' + config.get('nombre'));
console.log('BD Server: ' + uri);

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Conectado a MongoDB...'))
.catch(err => console.log('No se pudo conectar con MongoDB...', err));

app.use(express.json());

//Login, User, Spaces
app.use('/api/login', loginRouter);
app.use('/api/register', usersRouter);
app.use('/api/spaces', spacesRouter);
app.use('/api/favorites', favoritesRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});