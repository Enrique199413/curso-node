const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport')

const init = () => {
    //console.log('1......    init')
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: 'nodeJSSecret'
    }
    passport.use(new JwtStrategy(opts, (decoded, done) => {
        //console.log('----------d', decoded)
        return done(null, decoded)
    }))
}

const protectWithJwt = (req, res, next) => {
    //console.log('2......',req.path)
    if (req.path === '/api/login/') {
        return next()
    }

    //console.log('authen')
    return passport.authenticate('jwt', {session: false})
        /*, function (err){
        if (err) {
            //console.log(err)
            return next(res.status(401).json({message: 'Token not valid'}))
        }
    } */(req, res, next)
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