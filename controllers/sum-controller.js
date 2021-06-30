'use strict'
// Get sum result
exports.getSum = (req, res) => {
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
}
