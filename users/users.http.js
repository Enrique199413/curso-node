
const {
    getAllUsers,
    addUsers
} = require('./users.controller')

const getAllUsersHttp = async (req, res) => {
    try {
        const allUsers = await getAllUsers()
        res.status(200).json(
            allUsers
        )
    }catch (e) {
        res.status(400).json(e)
    }
}


const addUsersHttp = async (req, res) => {
    try {
        const insertedUsers = await addUsers(req.body)
        res.status(200).json(insertedUsers)
    }catch (e) {
        res.status(400).json(e)
    }
}



module.exports = {
    addUsersHttp,
    getAllUsersHttp
}