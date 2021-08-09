const loginController = require('./login.controller')
const loginHttp = async (req, res) => {
    // REGLA DE NEGOCIO

    const {username, password} = req.body
    try {
        if (username && password) {
            const response = await loginController.loginWithUsernameAndPassword(username, password)
            if (response.token) {
                res.status(200).json(response)
            } else {
                res.status(401).json(response)
            }
            
        } else {
            res.status(400).json({message: 'Please send username and password'})
        }
        
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = loginHttp