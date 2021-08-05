const router = require('express').Router()
const loginHttp = require('./login.http')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// router.post('/', loginHttp)

passport.use(new LocalStrategy((email, password, done) => {
    console.log(email, password, done)
    if (email === 'america@gmail.com') {
        done(null, 'ok')
    } else {
        done('ERROR')
    }
}));

// router.post('/',
// passport.authenticate('local', {
// successRedirect: '/',
// failureRedirect: '/error'
// }), loginHttp);
// 

router.post('/', passport.authenticate('local', { failureRedirect: '/error' }), loginHttp)

module.exports.loginRouter = router