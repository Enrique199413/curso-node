const favorites = require('express').Router();
const {addFavsHttp, updFavsHttp, delFavsHttp, getAllFavsHttp} = require('../favorites/favorites.http');
const {objectUtils} = require('../utils/utils');
const { verifyJwt } = require('../middleware/auth');

favorites.post('/', verifyJwt, (req, res, next) => {
    const message = 'Please add userId and spaceId';
    const {
        message : messageValidObjectStructure,
        canContinue: isValidBody
    } = objectUtils.existPropertiesOnObject(message, req.body, 'userId', 'spaceId');
    if(!isValidBody) {
        res.status(400).json({message: messageValidObjectStructure})
        return
    }
    
    const {
        message : messageValidValuesOnKeys,
        canContinue: isValidValuesOnBody
    } = objectUtils.allKeysWithValidData(req.body)

    if(!isValidValuesOnBody) {
        res.status(400).json({message: messageValidValuesOnKeys})
    }
    
    next()
}, addFavsHttp)
//Updating
favorites.get('/:idUser', verifyJwt, (req, res, next) => {
    next()
}, getAllFavsHttp)
//
favorites.put('/:idUser', verifyJwt, (req, res, next) => {
    next();
}, updFavsHttp)
favorites.delete('/:idUser', verifyJwt, (req, res, next) => {
    next();
}, delFavsHttp)

module.exports.favoritesRouter = favorites;