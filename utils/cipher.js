const bcrypt = require('bcrypt')
const saltRounds = 10;

const hashPassword = (password, done) => {
    bcrypt.hash(password, saltRounds, done)
}

const comparePassword = (password, comparePassword, done) => {
    bcrypt.compare(password, comparePassword, done)
}

module.exports.hashPassword = hashPassword
module.exports.comparePassword = comparePassword