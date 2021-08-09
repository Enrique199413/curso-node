const router = require('express').Router()
const {
    getAllSpacesHttp
} = require('./spaces.http')


router.get('/', getAllSpacesHttp)

module.exports.spacesRouter = router