
const loginController = require('./login.controller')
const loginHttp = (req, res) => {
    //Regla de negocio
    const {username, password} = req.body
    if(username && password){
        const token = loginController.loginWithUsernameAndPassword(username, password)
        res.status(201).json(token)
    } else {
        res.status(403).json('Please send username and password')
    }
    
}

module.exports= loginHttp