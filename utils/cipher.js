const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

const hashPassword = (pass, done) => {
  bcrypt.hash(pass, saltRounds, done);
};

const hashPasswordSync = () => {};

const comparePassword = (pass, comparePassword, done) => {
  bcrypt.compare(pass, comparePassword, done);
};

module.exports.hashPassword = hashPassword;
module.exports.comparePassword = comparePassword;
