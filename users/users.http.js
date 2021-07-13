const { addUser, getAllUsers, updateUser, deleteUser, getUserId } = require('./users.controller')
const { objectUtils } = require('../utils/utils')

const addUsersHttp = async(req, res) => {
    const { message, canContinues: isValidBody } = objectUtils.existPropertiesOnObject(res.body, 'name', 'lastName', 'surName')
    if (!isValidBody) {
        res.status(400).json({ message })
        return
    }

    try {
        const isUserAdd = await addUser(req.body)
        res.status(201).json({ code: 201, userCreated: {...req.body, _id: isUserAdd } })
    } catch (e) {
        console.error(e)
        res.status(400).json(e)
    }
}

const getAllUsersHttp = async(req, res) => {
    try {
        const getUser = await getAllUsers(req.body)
        res.status(200).json({ code: 200, userUpdate: { getUser } })
    } catch (e) {
        console.error(e)
        res.status(400).json(e)
    }
    // getAllUsers().then(resultados => {
    // res.status(200).json(resultados)
    // }).catch(error => {
    // res.status(400).json(error)
    // })
}

const updateUserHttp = async(req, res) => {
    try {
        const isUserUpdate = await updateUser(req.params.id, req.body)
        console.log(req.params.id)
        res.status(200).json({ code: 200, userUpdate: { isUserUpdate } })
    } catch (e) {
        console.error(e)
        res.status(400).json(e)
    }
}

const deleteUserHttp = async(req, res) => {
    try {
        const isUserDelete = await deleteUser(req.params.id)
        res.status(200).json({ code: 200, userDelete: { isUserDelete } })
    } catch (e) {
        console.error(e)
        res.status(400).json(e)
    }
}

const getUserIdHttp = async(req, res) => {
    try {
        const isUserGetId = await getUserId(req.params.id)

        res.status(200).json({ code: 200, userGetId: {...req.body, isUserGetId } })
    } catch (e) {
        console.error(e)
        res.status(400).json(e)
    }
}

module.exports = { addUsersHttp, getAllUsersHttp, updateUserHttp, deleteUserHttp, getUserIdHttp }