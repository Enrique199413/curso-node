const { getSpaces } = require('./spaces.controller')

const getSpacesHttp = async(req, res) => {
    try {
        const allSpaces = await getSpaces(req.body)
        res.status(200).json({ code: 200, allSpaces: { allSpaces } })
    } catch (e) {
        res.status(400).json({ message: 'Error' })
    }
}


module.exports = { getSpacesHttp }