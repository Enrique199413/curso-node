const { addUser, readUser } = require('./users.controller')
const { objectUtils } = require('../utils/utils')


const addUserHttp = async (req, res) => {
    const {
        message: messageValidObjectStructure, 
        canContinue: isValidBody
    } = objectUtils.existPropertiesOnObject(req.body, 'username', 'password')
    if (!isValidBody) {
        res.status(400).json({message: messageValidObjectStructure})
        return
    }
    try {
        const idFromUser = await addUser(req.body)
        res.status(201).json({
            userId: idFromUser
        })
    } catch (e) {
        console.error(e)
        res.status(400).json(e)
    }
}

const readUserHttp = async (req, res) => {
    try {
        if (req.body.username && req.body.password){
            const token = await readUser(req.body)
            res.status(200).json({
                token: token
            })
        } else {
            res.status(400).json({
                errors: 'Please add correct username and password'
            })
        }
        
    } catch (e) {
        res.status(400).json(e)
    }

}

module.exports = {
    addUserHttp,
    readUserHttp
}