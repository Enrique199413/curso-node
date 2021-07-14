const router = require("express").Router();
const {
  addUserHttp,
  getAllUsersHttp,
  updateUserHttp,
  deleteUserHttp,
} = require("./users.http");
const { objectUtils } = require("../utils/utils");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(function (username, password, done) {
    console.log(username, password, done);
    if (username === "jordy") {
      done(null, "ok");
    } else {
      done("ERROR");
    }
  })
);

// router.post(
//   "/",
//   passport.authenticate("local", { failureRedirect: "/login" }),
//   (addUserHttp) => {}
// );

router.put(
  "/:id",
  (req, res, next) => {
    const { message: messageValidObjectStructure, canContinue: isValidBody } =
      objectUtils.existPropertiesOnObject(
        req.body,
        "name",
        "lastName",
        "surName"
      );
    if (!isValidBody) {
      res.status(400).json({ message: messageValidObjectStructure });
      return;
    }

    const {
      message: messageValidValuesOnKeys,
      canContinue: isValidValuesOnBody,
    } = objectUtils.allKeysWithValidData(req.body);

    if (!isValidValuesOnBody) {
      res.status(400).json({ message: messageValidValuesOnKeys });
    }
    next();
  },
  updateUserHttp
);

router.post(
  "/",
  (req, res, next) => {
    const { message: validObjectStructure, canContinue: isValidBody } =
      objectUtils.existPropertiesOnObject(
        req.body,
        "name",
        "lastName",
        "surName"
      );
    if (!isValidBody) {
      res.status(400).json({ message: validObjectStructure });
      return;
    }

    const { message: validValuesOnKeys, canContinue: isValidValuesOnBody } =
      objectUtils.allKeysWithValidData(req.body);
    if (!isValidValuesOnBody) {
      res.status(400).json({ message: validValuesOnKeys });
      return;
    }
    next();
  },
  addUserHttp
);

router.get(
  "/",
  (req, res, next) => {
    const {
      query: { name, lastName, surName },
    } = req;

    let params = {
      name: req.query.name ? req.query.name : "",
      lastName: req.query.lastName ? req.query.lastName : "",
      surName: req.query.surName ? req.query.surName : "",
    };

    // console.log(nameUser, lastNameUser, surNameUser);

    if (req.query.name || req.query.lastName || req.query.surName) {
      console.log("entro a buscar");

      const { message: validValuesOnKeys, canContinue: isValidValues } =
        objectUtils.searchUser(params);
      if (!isValidValues) {
        res.status(400).json({ message: validValuesOnKeys });
        return;
      }
      req.params = params;
      next();
    } else {
      next();
    }
  },
  getAllUsersHttp
);

router.delete("/:id", deleteUserHttp);

module.exports.userRouter = router;
