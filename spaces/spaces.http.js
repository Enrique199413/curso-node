const {getAllSpaces} = require('./spaces.controllers');

const getAllSpacesHttp = (req, res) => {
    getAllSpaces()
    .then(resultados => {
        res.status(200).json(resultados);
    }).catch(error => {
        res.status(400).json(error);
    })
    
}

module.exports = {
    getAllSpacesHttp
}