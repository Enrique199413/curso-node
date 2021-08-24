const {getUser} = require('./login.controllers');

const getUserHttp = async(req, res) => {
    const body = req.body;
    const gettingUser = getUser(body);
    console.log("Withing getUserHttp-response getUser");
    gettingUser.then(userTkn => {
        res.status(200)
        .json(userTkn);
    }).catch(err => {
        console.error(err);
        res.status(400).json(err);
    });
}

module.exports = {
    getUserHttp
}