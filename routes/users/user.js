const router = require("express").Router();
const { getAllUsersHttp } = require("../../controllers/users/users.http");

router.get("/", getAllUsersHttp);

module.exports.userRoutes = router;
