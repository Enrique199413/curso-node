const router = require('express').Router();
const {addUserHttp} = require('./users.http');
const {objectUtils} = require('../utils/utils');
const Joi = require('joi');

//Register
router.post('/', (req, res, next) => {
    const message = 'Please add username and password';
    const {
        message : messageValidObjectStructure,
        canContinue: isValidBody
    } = objectUtils.existPropertiesOnObject(message, req.body, 'username', 'password');
    if(!isValidBody) {
        res.status(400).json({message: messageValidObjectStructure})
        return
    }
    
    next()
}, addUserHttp);

module.exports.usersRouter = router;