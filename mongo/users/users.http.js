const { addUser, getAllUsers, updateUser, deleteUser } = require('./users.controller')
const { objectUtils } = require('../utils/utils')
 
const addUsersHttp = async (req, res) => { 

    const {
        message,
        canContinue: isValidBody
    } = objectUtils.existPropertiesOnObject(req.body, 'name', 'lastName', 'surName')

    if(!isValidBody){
        res.status(400).json({message})
    }

    try {
        const idFromUser = await addUser(req.body)
        res.status(201).json(
            { 
                _id: idFromUser
            }
        )
    } catch (error) {
        res.status(400).json(error)
    }
}
 
const getAllUsersHttp = (req, res) => {
    getAllUsers(req.query).then(resultados => {
        res.status(resultados.length > 0 ? 200: 404).json({
            count: resultados.length,
            data: resultados
        })
    }).catch(error => {
        res.status(400).json(error)
    })
}

const updateUserHttp = async (req, res) => { 

    const {
        message,
        canContinue: isValidBody
    } = objectUtils.existPropertiesOnObject(req.body, 'name', 'lastName', 'surName')

    if(!isValidBody){
        res.status(400).json({message})
    }

    try {
        const idFromUser = await updateUser(req.params.id, req.body)
        res.status(201).json(
            { 
                _id: idFromUser
            }
        )
    } catch (error) {
        res.status(400).json(error)
    }
}

const deleteUserHttp = async (req, res) => { 

    try {
        const idFromUser = await deleteUser(req.params.id)
        res.status(201).json(
            { 
                _id: idFromUser
            }
        )
    } catch (error) {
        res.status(400).json(error)
    }
}
 
module.exports = { addUsersHttp, getAllUsersHttp, updateUserHttp, deleteUserHttp }