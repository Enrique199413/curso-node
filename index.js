const bodyParser = require('body-parser')
//const { response } = require('express')
const express = require('express')
const dotenv = require('dotenv').config()
const fetch = require('node-fetch')
const setupAuthMiddleware = require('./middleware/index')

let app = express()
setupAuthMiddleware(app)
//app.use(bodyParser.json())
const port = 8080
const AIRTABLE_API_KEY = process.env['AIRTABLE_API_KEY']

////////
const {userRouter} = require('./users/users.router')
const {loginRouter} = require('./login/login.router')



////////

const authMiddleware = require('./middleware/auth')
//const manageError = require('./middleware/manageError')
//const programingLanguageRoutes = require('./controllers/programinglenguajes/programingLenguajes.router')
//const passport = require('passport')
////



if (process.env.NODE_ENV === 'development') {
    process.env.MONGO_DB_URI = 'mongodb://localhost:27000'
} else {
    MONGO_DB_URI = "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

}



// Primero antes que todoo
app.use(bodyParser.json())
//app.use(passport.initialize())
//app.use(passport.session())
// Opcion 1
// const UserController = require('./controllers/userController').User
// comentar para el uso de routas
//const {readUser, addUser, deleteUser} = require('./controllers/userController').User

//app.use('/programingLenguajes', programingLanguageRoutes)
app.use('/users', userRouter)
app.use('/login', loginRouter)



app.listen(port, () => {
    console.log(`aqui corro http://localhost:${port}`)
})




// para que la prueba tenga acceso
module.exports = app