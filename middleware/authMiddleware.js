const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport')

const init = () => {
    console.log('fdfdfdfdfdfd')
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: 'nodeJSSecret'

    }
    console.log(opts.jwtFromRequest)
    console.log('init -----------')
    passport.use(new JwtStrategy(opts, (decoded, done) => {
        console.log('-----------15 ', decoded)
        return done(null, decoded)
    }))
}

const protectWithJwt = (req, res, next) => {
    console.log('protection', req.path)
    if (req.path === '/' || req.path === '/login') {
        return next()
    }
    console.log('protfsvdvs')

    return passport.authenticate('jwt', {session: false})(req, res, next)
}

module.exports = {
    init,
    protectWithJwt
}

/**
 * o
 *
 * exports.init = init
 exports.protectWithJwt = protectWithJwt
 */