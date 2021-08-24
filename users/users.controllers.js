const bcrypt = require('bcrypt')
const User = require('../models/user_model')

const addUser = async (body) => {
    
    try {
        const validUser = body.username;
        const exist = await User.findOne({username: validUser}).exec();
        console.log(exist)
        if(exist !== null) {
            return Promise.reject({
                message: 'Username exists, please login'
            })
        }
        let users = new User({
            username : validUser,
            password : bcrypt.hashSync(body.password,10)
        });
        //Regresara una promesa
        return await users.save();
    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    }
}

module.exports = {
    addUser
}