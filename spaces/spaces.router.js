const router = require('express').Router()
const { getSpacesHttp } = require('./spaces.http')

router.get('/', getSpacesHttp)

module.exports.spacesRouter = router