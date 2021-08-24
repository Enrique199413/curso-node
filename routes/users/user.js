const router = require("express").Router();
const {
  addUserHttp,
  getAllUsersHttp,
  getByParams,
  deleteUser,
  updateUser,
} = require("../../controllers/users/users.http");
const { validData } = require("../../moddlewares/validation");

router.post("/", validData, addUserHttp);
router.get("/", getAllUsersHttp);
router.get("/find/:name?/:lastName?/:surName?", getByParams);
router.delete("/:userId", deleteUser);
router.put("/:userId", updateUser);

module.exports.userRoutes = router;
