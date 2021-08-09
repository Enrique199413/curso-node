const { registerUser, getRegisterUser } = require('./users.controller')

const registerUserHttp = async(req, res) => {
    try {
        const idCreatedUser = await registerUser(req.body, 'username', 'password')
        res.status(202).json({
            code: 202,
            _id: idCreatedUser,
            username: req.body.username,
            password: req.body.password
        })
    } catch (e) {
        res.status(400).json(e)
    }
}

const getUserHttp = async(req, res) => {
    try {
        const getUsers = await getRegisterUser(req.body)
        res.status(200).json({ code: 200, userUpdate: { getUsers } })
    } catch (e) {
        res.status(400).json({ message: 'Error' })
    }
}

module.exports = { registerUserHttp, getUserHttp }