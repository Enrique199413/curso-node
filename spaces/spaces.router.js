const router = require("express").Router();
const spacesHttp = require("./spaces.http");

router.get("/", spacesHttp);

module.exports.spacesRouter = router;
