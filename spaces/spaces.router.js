const router = require('express').Router()

const { getAllSpacesHttp } = require('./spaces.http')

//read
router.get('/', getAllSpacesHttp)


module.exports.spacesRouter = router