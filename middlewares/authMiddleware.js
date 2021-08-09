const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport')

const init = () => {
    const opt = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
        secretOrKey: 'nodeJSSecret'
    }
    passport.use(new JwtStrategy(opt, (decoded, done) => {
        return done(null, decoded)
    }))
}

const protectWithJwt = (req, res, next) => {
    if (req.path === '/' || req.path === '/api/login') {
        return next()
    }
    return passport.authenticate('jwt', { session: false })(req, res, next)
}

module.exports = {
    init,
    protectWithJwt
}