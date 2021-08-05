const loginController = require('./login.controller')

const loginHttp = (req, res) => {
    console.log('hola http')
    const { email, password } = req.body
    if (email && password) {
        const token = loginController.loginWithEmailAndPassword(email, password)
        res.status(200).json({ token })
    } else {
        res.status(400).json({ message: 'Please add correct email or password' })
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