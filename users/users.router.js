const router = require('express').Router()
const { addUsersHttp, getAllUsersHttp, updateUserHttp, deleteUserHttp, getUserIdHttp } = require('./users.http')
const { objectUtils } = require('../utils/utils')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy((username, password, done) => {
    console.log(username, password, done)
    if (username === 'enrique') {
        done(null, 'ok')
    } else {
        done('ERROR')
    }
}));


router.post('/', passport.authenticate('local', { failureRedirect: '/error' }), addUsersHttp)
    // (req, res, next) => {
    // const {
    // message: validstructure,
    // canContinue: isValidBody
    // } = objectUtils.existPropertiesOnObject(req.body, 'name', 'lastName', 'surName')
    // if (!isValidBody) {
    // res.status(400).json({ message: validstructure })
    // return
    // }
    // const {
    // message: messageValidValuesOnKeys,
    // canContinue: isValidValuesBody
    // } = objectUtils.allKeysWithValidData(req.body)
    // if (!isValidValuesBody) {
    // res.status(400).json({ message: messageValidValuesOnKeys })
    // return
    // }
    // next()
    // }

router.get('/', getAllUsersHttp)
router.put('/:id', updateUserHttp)
router.delete('/:id', deleteUserHttp)
router.get('/:id', (req, res, next) => { return res.body }, getUserIdHttp)


module.exports.usersRouter = router