const jwt = require('jsonwebtoken');
const config = require('config')
const secret = config.get('configToken.SEED');

let verifyToken = (req,res,next) => {
    let token = req.get('Authorization');
    jwt.verify(token, secret, (err, decoded) => {
        if(err) {
            return res.status(401).json(err);
        }
        req.usuario = decoded.usuario
        next()
    });
}

module.exports.verifyJwt = verifyToken;