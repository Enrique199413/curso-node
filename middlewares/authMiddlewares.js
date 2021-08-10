const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport')

const init = () => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
        secretOrKey: 'nodeJSSecret'
    }
    passport.use(new JwtStrategy(opts, (decoded, done) => {
        return done(null, decoded)
    }))
}

const protectWithJwt = (req, res, next) => {
    if(req.path === '/api/login' || req.path === '/api/register') {
        return next()
    }
    return passport.authenticate('jwt', {session: false})(req, res, next)
}

module.exports = {
    init,
    protectWithJwt
}