
const express = require('express')
const bodyParser = require('body-parser')
let app = express()
app.use(bodyParser.json())
const port = 3000

const {usersRouter} = require('./users/users.router')
const {spacesRouter} = require('./spaces/spaces.router')
const {favoritesRouter} = require('./favorites/favorites.router')
const setupAuthMiddleware = require('./middlewares/index')

setupAuthMiddleware(app)

app.use('/api', usersRouter)
app.use('/api/spaces', spacesRouter)
app.use('/api/favorites', favoritesRouter)



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

