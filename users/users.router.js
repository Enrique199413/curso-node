const router = require('express').Router()
const {addUserHttp, getAllUserHttp, upDateUserHttp, deleteOneUserHttp} = require('./users.http')
const { objectUtils } = require('../utils/utils')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy

/*
router.post('/', (req, res, next) => {
    const {
        message: messageValidObjectStructure,
        canContinue: isValidBody
    } = objectUtils.existPropertiesOnObject(req.body, 'name', 'lastName', 'surName')
    if (!isValidBody) {
        res.status(400).send({message: messageValidObjectStructure})
        return
    }
    const {
        message: messageValidValuesOnKeys,
        canContinue: isValidValuesOnBody
    } = objectUtils.allKeysWithValidData(req.body)

    if(!isValidValuesOnBody) {
        res.status(400).json({message: messageValidValuesOnKeys})
        return
    }
    next()
},addUserHttp)
*/

passport.use(new localStrategy({
    usernameField: 'user',
    passwordField: 'passport',
    session: false
},
(username, passport, done) => {
    console.log(username, passport, done)
    if (username === 'erick') {
        done(null, 'OK')
    } else {
        done('ERROR')
    }
})
)

router.post('/',passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/'
}),addUserHttp)


router.put('/:id', upDateUserHttp)

router.get('/', getAllUserHttp)

router.delete('/', deleteOneUserHttp)

module.exports.usersRouter = router