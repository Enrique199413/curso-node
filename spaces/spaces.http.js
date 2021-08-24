const { getAllSpaces } = require('./spaces.controller')
const { objectUtils } = require('../utils/utils')

const getAllSpacesHttp = (req, res) => {
    getAllSpaces(req.query).then(resultados => {
        res.status(resultados.length > 0 ? 200: 404).json({
            data: resultados
        })
    }).catch(error => {
        res.status(400).json(error)
    })
}

module.exports = {
    getAllSpacesHttp
}