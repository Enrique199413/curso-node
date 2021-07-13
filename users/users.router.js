const router = require('express').Router()
const {objectUtils} = require('../utils/utils')

const { addUserHttp,
    getAllUserHttp,
    addUserHttpMideleware,
    updateUserHttp,
    deleteUserHttp,
    getUserHttpByParams
} = require('./users.http')

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
/**
 * Tarea 2: Para el martes 13 de julio
 * Crear el método put en el router de users y actualizar un registro desde
 * un id dado en el params y mandar el update en el body, recordar utilizar las validaciones
 * router.put('/:id', getAllUsersHttp)
 */
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

/**
 * Tarea 3: Para el martes 13 de julio
 * Crear el método delete en el router de users y eliminar de bd
 */
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


module.exports.userRouter = router


