const  {addUser, getAllUser, updateUser, deleteUser, getByParams} = require('./users.controller')
const {objectUtils} = require('../utils/utils')

// http://mongodb.github.io/node-mongodb-native/3.6/api/  TODO documentacion mongo
// TODO documentacion de api mongo
/*
const addUserHttp = async (req, res) => {
    try {
        console.log(req.body)
        const idFromUser = await addUser(req.body)
        //const idFromUser = await addUser({name: 'Rocio', surName: 'Hernandez'})  TODO add use body parser
        res.status(201).json({
            code: 201,
            userCreated: {
                ...req.body,
                ...idFromUser // Toma el nombre de la variable
            }
        })
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
    //res.status(200).json({message: 'Ok desde add user http'})
}
*/

const addUserHttp = async (req, res) => {

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

    console.log('')
    try {
        const idFromUser = await addUser(req.body)
        res.status(201).json({
            code: 201,
            _id: idFromUser,
            /*userCreated: {
                ...req.body,
                ...idFromUser // Toma el nombre de la variable
            }*/
        })
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
    //res.status(200).json({message: 'Ok desde add user http'})
}
const addUserHttpMideleware = async (req, res) => {
    console.log('midelware')
    try {
        const idFromUser = await addUser(req.body)
        res.status(201).json({
            code: 201,
            _id: idFromUser,
            /*userCreated: {
                ...req.body,
                ...idFromUser // Toma el nombre de la variable
            }*/
        })
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
    //res.status(200).json({message: 'Ok desde add user http'})
}

const getAllUserHttp = async (req, res) => {
    //getAllUser().then(resultados => {
        try {
            const allUsers = await getAllUser()
            res.status(200).json(allUsers)
        }catch (e) {
            res.status(400).json({data: e})
        }
    //})
    //res.status(200).json({message: 'Ok desde getAllUserHttp'})
}

const updateUserHttp = async (req, res) => {
    console.log('midelware')
    const {params: {id}} = req
    console.log('http', id)
    try {
        const updateByIdUser = await updateUser(id, req.body)
        res.status(201).json({
            code: 201,
            _id: id,
            message: `update ok from ${id} with name: ${req.body.name}, lastnane: ${req.body.lastName}, surName: ${req.body.surName}}`
        })
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
    //res.status(200).json({message: 'Ok desde add user http'})
}

const deleteUserHttp = async (req, res) => {
    const {params: {id}} = req
    console.log('delete by id: ', id)

    try {
        const statuDelete = await deleteUser(id)
        res.status(statuDelete.statusDelete).json({
            id,
            message: statuDelete.messageDelete


        })
    }catch (e) {
        res.status(400).json({data: e})
    }
    //})
    //res.status(200).json({message: 'Ok desde getAllUserHttp'})
}

const getUserHttpByParams = async (req, res) => {
    //getAllUser().then(resultados => {
    //console.log(req)
    const {query: {name, lastName, surName}} = req
    console.log('http: ',name, lastName, surName)

    const {filterContinue, data
    } = objectUtils.filterFinByParams({name, lastName, surName}, 'name', 'lastName', 'surName')

    try {
        const data = await getByParams({name, lastName, surName})
        res.status(200).json({
            data
        })
    }catch (e) {
        res.status(400).json({data: e})
    }
    //})
    //res.status(200).json({message: 'Ok desde getAllUserHttp'})
}




module.exports = {
    addUserHttp,
    getAllUserHttp,
    addUserHttpMideleware,
    updateUserHttp,
    deleteUserHttp,
    getUserHttpByParams
}