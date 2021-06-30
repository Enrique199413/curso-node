'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

// Controllers
const rootController = require('./controllers/root-controller')
const helloWorldController = require('./controllers/helloworld-controller')
const sumController = require('./controllers/sum-controller')
const usersController = require('./controllers/users-controller')

// Root
app.get('/', rootController.getAppInfo)

// Hello World
app.get('/hola-mundo', helloWorldController.getHelloWorld)

// Sum
app.get('/suma', sumController.getSum)

// Users
app.get('/users', usersController.getUsers)
app.post('/users', usersController.addUser)

// Listening for local execution
app.listen(8000, () => console.log('Listening on port 8000...'))

exports = app
