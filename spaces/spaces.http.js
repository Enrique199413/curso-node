const { readAllSpaces } = require('./spaces.controller')


const getAllSpacesHttp = async(req, res) => {

    try {
        const allSpaces = await readAllSpaces()
        res.status(200).json(allSpaces)
    } catch (e) {
        res.status(400).json(e) 
    }
}

module.exports = {
    getAllSpacesHttp
}