const { addUser, getAllUsers } = require('./users.controller')
const { objectUtils } = require('../utils/utils')

const addUserHttp = async (req, res) => {
    const {
        message: messageValidObjectStructure, 
        canContinue: isValidBody
    } = objectUtils.existPropertiesOnObject(req.body, 'name', 'lastName', 'surName')
    if (!isValidBody) {
        res.status(400).json({message: messageValidObjectStructure})
        return
    }
    try {
        const idFromUser = await addUser(req.body)
        res.status(201).json({
            code: 201, 
            userCreated: {
                id: idFromUser//{id: 123123}
            }
        })
    } catch (e) {
        console.error(e)
        res.status(400).json(e)
    }
}

const getAllUserHttp = async(req, res) => {
    const allUsers = await getAllUsers()
    try {
        const allUsers = await getAllUsers()
        res.status(200).json(allUsers)
    } catch (e) {
        res.status(400).json(e)
    }
    /*
    getAllUsers().then(resultados => {
        res.status(200).json({resultados})
    }).catch(err => {
        res.status(400).json({err})
    })
    */
}

module.exports = {
    addUserHttp,
    getAllUserHttp
}