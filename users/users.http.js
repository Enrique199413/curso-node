//Maneja request y response, handler
const {addUser} = require('./users.controllers');

const addUserHttp = async (req, res) => {    

    let body = req.body;
    let userAdded = addUser(body);
    console.log(userAdded);
    userAdded.then(user => {
        res.status(201)
        .json({
            userId: user.id 
        })
    }).catch(err => {
        console.error(err);
        res.status(400).json({
            error: err
        });
    });
}

module.exports = {
    addUserHttp
}