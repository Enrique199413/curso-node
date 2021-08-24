const bodyParser = require('body-parser')
const express = require('express')
if (process.env.NODE_ENV === 'development') {
    process.env.MONGO_DB_URI = 'mongodb://localhost:27000'
} else {
    process.env.MONGO_DB_URI = "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

}
const setupAuthMiddleware = require('./middleware/index')
const port = 1112
let app = express()
setupAuthMiddleware(app)


const {userRouter} = require('./users/users.router')
const {loginRouter} = require('./login/login.router')
const {favoritesRouter} = require('./favorites/favorites.router')
const {spacesRouter} = require('./spaces/spaces.router')


app.use(bodyParser.json())

app.use('/api/register', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/favorites', favoritesRouter)
app.use('/api/spaces', spacesRouter)

app.listen(port, () => {
    console.log(`aqui es el examen http://localhost:${port}`)
})


// para que la prueba tenga acceso
module.exports = app