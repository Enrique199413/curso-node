const express = require('express');
const setupAuthMiddleware = require('./middlewares/index')
const { loginRouter } = require('./login/login.router')
const { usersRouter } = require('./users/users.router')
const { spacesRouter } = require('./spaces/spaces.router')
const { favoritesRouter } = require('./favorites/favorites.router')
const port = 3000;
let app = express();

setupAuthMiddleware(app)

app.use('/api/login', loginRouter)
app.use('/api/register', usersRouter)
app.use('/api/spaces', spacesRouter)
app.use('/api/favorites', favoritesRouter)


app.listen(port, () => {
    console.log(`Estamos en el puerto: ${port}`);
});

module.exports = app;