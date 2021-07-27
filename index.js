const bodyParser = require('body-parser')
const express = require('express')
const fetch = require('node-fetch')
const setupAuthMiddleware = require('./middleware/index')

let app = express()
setupAuthMiddleware(app)
const port = 8080

const {userRouter} = require('./users/users.router')
const {loginRouter} = require('./login/login.router')


if (process.env.NODE_ENV === 'development') {
    process.env.MONGO_DB_URI = 'mongodb://localhost:27000'
} else {
    MONGO_DB_URI = "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

}


app.use(bodyParser.json())

app.use('/users', userRouter)
app.use('/login', loginRouter)



app.listen(port, () => {
    console.log(`aqui corro http://localhost:${port}`)
})


// para que la prueba tenga acceso
module.exports = app