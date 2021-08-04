const loginController = require('./login.controller')
const loginHttp = (req, res) => {
    // REGLA DE NEGOCIO
    const { username, password } = req.body
    if (username && password) {
        const token = loginController.loginWithUsernameAndPassword(username, password)
        res.status(200).json({ token })
    } else {
        res.status(400).json({ message: 'Please send username and password' })
    }

}

// const loginGet = (req, res) => {
// const { token } = req.body
// if (token) {
// const user = loginController.getInfoUsers(token)
// res.status(200).json({ user })
// } else {
// res.status(400).json({ message: 'Token invalido' })
// }
// 
// }

module.exports = loginHttp