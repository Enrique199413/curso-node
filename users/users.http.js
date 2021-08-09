const {addUser, getAllUsers} = require('./users.controllers')
const { objectUtils } = require('../utils/utils')
 
const addUsersHttp = async (req, res) => { 
    const {
        message,
        canContinue: isValidBody
    } = objectUtils.existPropertiesOnObject(req.body, "username", "password")

    if(!objectUtils.validateEmail(req.body.username)){
        res.status(400).json({message: "Please enter a valid email"})
    }

    if(!isValidBody || !(req.body.username && req.body.password)){
        res.status(400).json({message: "Please add username and passwords"})
    }

    try {
        const idFromUser = await addUser(req.body)
        res.status(201).json(idFromUser)
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

module.exports = { addUsersHttp, getAllUsersHttp }