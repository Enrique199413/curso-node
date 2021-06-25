const bodyParser = require('body-parser')
const express = require('express')
const app = express()
app.use(bodyParser.json())
 
app.get('/hola-mundo', (req, res) => res.send('Hola mundo :D'))

app.get('/suma', (req, res) => {
  const {body, params, query} = req
  const {a,b} = query  
  if (isNaN(a) || isNaN(b)){
    res.status(400)
    .json({
      message: `parámetros no válidos: a=${a}, b=${b}`,
      code: 400
    })
    return
  }
  res
    .status(200)
    .send(`suma: ${parseInt(a) + parseInt(b)}`)
})

app.listen(3000)

module.exports = app
