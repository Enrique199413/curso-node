const router = require('express').Router();
const {getUserHttp} = require('./login.http');
const Joi = require('joi');

const schema = Joi.object({
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    username: Joi.string()
        .email()
});
//Loging
router.post('/', (req, res, next) => {
    const body = req.body;
    console.log(body);
    const {error, value} = schema.validate({username: body.username, password: body.password});
    if(error) {
        console.log("Within login.router - joi validation... error");
        console.log(error);
        const errorMsg = 'Please add correct username and password'
        console.log(errorMsg)
        res.status(400).json({
            errors: errorMsg
        });
        console.log("Error validation done...");
        return;
    }
    next()
}, getUserHttp)

module.exports.loginRouter = router;