const router = require('express').Router()
const { addUsersHttp } = require('./users.http')
    // const { objectUtils } = require('../utils/utils')
    // const passport = require('passport')
    // const LocalStrategy = require('passport-local').Strategy

// passport.use(new LocalStrategy((username, password, done) => {
// console.log(username, password, done)
// if (username === 'acirema@gmail.com') {
// done(null, 'ok')
// } else {
// done('ERROR')
// }
// }));


// router.post('/', passport.authenticate('local', { failureRedirect: '/error' }), addUsersHttp)

router.post('/', addUsersHttp)

module.exports.usersRouter = router