const router = require('express').Router();
const { verifyJwt } = require('../middleware/auth');
const {getAllSpacesHttp} = require('./spaces.http');


//Spaces
router.get('/', verifyJwt, getAllSpacesHttp);

module.exports.spacesRouter = router;