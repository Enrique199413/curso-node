const router = require('express').Router()
const { addUsersHttp } = require('./users.http')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy((email, password, done) => {
    console.log(email, password, done)
    if (email === 'america@gmail.com') {
        done(null, 'ok')
    } else {
        done('ERROR')
    }
}));


router.post('/', passport.authenticate('local', { failureRedirect: '/error' }))

module.exports.usersRouter = router