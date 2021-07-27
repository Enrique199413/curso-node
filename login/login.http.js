const loginController = require('./login.controller')
const userController = require('./../users/users.controller')


const loginHttp = async (req, res) => {
    // nREGLAS DE NEGOCIO

    const  {username, lastName} = req.body
    if (username && lastName) {
        const getUserList = await userController.getByParams({name: username, lastName})

        console.log('usuario',getUserList.count)
        if (getUserList.count != 0) {
            const token = loginController.loginWithUsernameAndLastname(username, lastName)

            return res.status(201).json(token)
        }
        res.status(404).json({mensaje: 'Not found user'})
    } else {
        res.status(403).json({message: 'Please send username and lastName'})
    }


}

module.exports = loginHttp