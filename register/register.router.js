const router = require("express").Router();
const registerHttp = require("./register.http");

router.post("/", registerHttp);

module.exports.registerRouter = router;
