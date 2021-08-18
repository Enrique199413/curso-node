const User = require('../models/user_model');
const bcrypt = require('bcrypt');
const config = require('config');
const secret = config.get('configToken.SEED');
const expire = config.get('configToken.expiration');
const jwt = require('jsonwebtoken');

//Reading a user
const getUser = async (body) => {
    const validUser = body.username;
    const validPass = body.password;
    console.log('Within user controller-getUser')
    console.log(validUser);
    try {
        const userExist = await User.findOne({username: validUser}).exec();
        console.log(userExist)
        if(!userExist) {
            return Promise.reject({
                errors: 'Please add correct username and password'
            })
        }
        console.log("User retrieved");
        const validPassword = bcrypt.compareSync(validPass, userExist.password);
        console.log(validPassword);
        if(!validPassword) {
            return Promise.reject({
                errors: "Please add correct username and password"
            })
        }
        const jwtToken = jwt.sign({
            data: {_id: userExist._id, username: userExist.username, password: userExist.password}
          }, secret, { expiresIn: expire });
        //const jwtToken = jwt.sign({_id: datos._id, username: datos.username, password: datos.password}, 'myPassword');
        return Promise.resolve({
            token: jwtToken
            
        });
        
    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    }
}

module.exports = {
    getUser
}