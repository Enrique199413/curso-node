const LocalStrategy = require("passport-local").Strategy;

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({}, (username, pass, done) => {
      console.log(username, pass, done);
      if (username === "jordy") {
        done(null, "ok");
      } else {
        done("ERROR");
      }
      // TODO: Consultar BD si es que existe
    })
  );
};
