const loginController = require('./login.controller')


const loginHttp = async (req, res) => {
    // nREGLAS DE NEGOCIO

    const  {username, password} = req.body
    if (username && password) {
        const token = loginController.loginWithUsernameAndPassword(username, password)

        const verify = loginController.verifyToken(token)
        console.log(verify)
        res.status(201).json(token)
    } else {
        res.status(403).json({message: 'Please send username and password'})
    }


}

module.exports = loginHttp