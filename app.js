const express = require('express')
const { usersRouter } = require('./users/users.router')
const { loginRouter } = require('./login/login.router')
const { favoritesRouter } = require('./favorites/favorites.router')
const { spacesRouter } = require('./spaces/spaces.router')
const passport = require('passport')
const setupAuthMiddleware = require('./middlewares/index')

let app = express()
app.use(passport.initialize())
setupAuthMiddleware(app)



app.use('/api/', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/favorites', favoritesRouter)
app.use('/api/spaces', spacesRouter)

const port = 8080

app.listen(port, () => {
    console.log(`Escuchando en el puerto: ${port}`)
})

module.exports = app