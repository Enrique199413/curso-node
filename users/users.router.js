const router = require('express').Router()
const {objectUtils} = require('../utils/utils')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const { addUserHttp,
    getAllUserHttp,
    addUserHttpMideleware,
    updateUserHttp,
    deleteUserHttp,
    getUserHttpByParams,
    addUserConnectionClousure
} = require('./users.http')



passport.use(new LocalStrategy({
        username: 'username',
        password: 'password'
},
    function(username, password, done) {
        console.log(username, password, done)
        if (username === 'enrique') {
            done (null, 'ok')
        } else {
            done('ERROR')
        }
    }
));

/*router.post('/passport', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}), addUserHttpMideleware)*/


router.post('/', (req, res, next) => {
    console.log('middleware')
    const {message: messageValidObjectStructure,
        canContinue: isValidBody
    } = objectUtils.existPropertiesOnObject(req.body, 'name', 'lastName', 'surName')
    if (!isValidBody) {
        res.status(400).json({message: messageValidObjectStructure})
        return
    }


    const {message: messageValidValuesOnKeys,
        canContinue: isValidValuesOnBody
    } = objectUtils.allKeysWithValidData(req.body)

    if (!isValidValuesOnBody) {
        res.status(400).json({message: messageValidValuesOnKeys})
        return
    }
    next()
}, addUserHttpMideleware)

router.get('/', getAllUserHttp)

router.patch('/:id', (req, res, next) => {
    console.log('PATCH by id in params /:id')
    const {params: {id}} = req
    console.log(id)
    const {message: messageValidObjectStructure,
        canContinue: isValidBody
    } = objectUtils.existPropertiesOnObject(req.body, 'name', 'lastName', 'surName')
    if (!isValidBody) {
        res.status(400).json({message: messageValidObjectStructure})
        return
    }

    const {message: messageValidValuesOnKeys,
        canContinue: isValidValuesOnBody
    } = objectUtils.allKeysWithValidData(req.body)

    if (!isValidValuesOnBody) {
        res.status(400).json({message: messageValidValuesOnKeys})
        return
    }
    next()
}, updateUserHttp)

router.delete('/:id', (req, res, next) => {
    console.log('PATCH by id in params /:id')
    const {params: {id}} = req
    console.log(id)
    if (!id) {
        res.status(400).json({message: 'id requeriso'})
        return
    }
    next()
}, deleteUserHttp)
router.get('/d', getUserHttpByParams)


//router.get('/conecct/clousure', addUserConnectionClousure)



module.exports.userRouter = router


