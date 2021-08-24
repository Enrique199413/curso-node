const loginController = require('./login.controller')

const loginHttp = (req, res) => {
    const { email, password } = req.body
    if (email && password) {
        const token = loginController.loginWithEmailAndPassword(email, password)
        res.status(200).json({ token })
    } else {
        res.status(400).json({ message: 'Please add correct email or password' })
    }
}

module.exports = loginHttp