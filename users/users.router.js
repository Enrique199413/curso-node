const router = require("express").Router();
const { getUsersHttp } = require("./users.http");

router.get(
  "/",
//   (req, res, next) => {
//     const token = req.headers["Authorization"];

//     if (token) {
//       jwt.verify(token, app.get("llave"), (err, decoded) => {
//         if (err) {
//           return res.json({ mensaje: "Invalid Token" });
//         } else {
//           req.decoded = decoded;
//           next();
//         }
//       });
//     } else {
//       res.send({
//         mensaje: "Token no proveída.",
//       });
//     }
//   },
  getUsersHttp
);

module.exports.usersRouter = router;
