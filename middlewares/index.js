const bodyParser = require("body-parser");
const authMiddleware = require("./authMiddleware");

const setupAuthMiddleware = (app) => {
  app.use(bodyParser.json());
  authMiddleware.init();
  app.use(authMiddleware.protectWithJwt);
};

module.exports = setupAuthMiddleware;
