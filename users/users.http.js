const { addUser } = require('./users.controller')

const addUsersHttp = async(req, res) => {
    console.log('addUser')
        // const { message, canContinues: isValidBody } = objectUtils.existPropertiesOnObject(res.body, 'email', 'surname')
        // if (!isValidBody) {
        // res.status(400).json({ message })
        // return
        // }
    try {
        const isUserAdd = await addUser(req.body)
        console.log('sii')
        res.status(202).json({ code: 201, userCreated: {...req.body, _id: isUserAdd } })
    } catch (e) {
        res.status(400).json({ message: "Please add username and passwords" })
    }
}

module.exports = { addUsersHttp }