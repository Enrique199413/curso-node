const loginController = require('./login.controller')
const userController = require('./../users/users.controller')


const loginHttp = async (req, res) => {
    // nREGLAS DE NEGOCIO

    const  {username, password} = req.body
    if (username && password) {
        const getUserList = await userController.getByUsernamePassword({username, password})

        console.log('usuario------',getUserList)
        console.log('usuario------',!getUserList)
        if (getUserList != null) {
            const token = loginController.loginWithUsernameAndPassword(username, password)

            return res.status(201).json({'token': token})
        }
        res.status(404).json({mensaje: 'Not found user'})
    } else {
        res.status(403).json({message: 'Please send username and password'})
    }


}

module.exports = loginHttp