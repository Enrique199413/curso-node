const User = require('../models/user_model')
const bcrypt = require('bcrypt');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('configToken.SEED')
const expir = config.get('configToken.expiration')

router.post('/', (req,res) => {
    const body = req.body;
    console.log(body);
    User.findOne({username: body.username})
    .then(datos => {
        console.log(body.password);
        console.log(datos)
        if(datos) {
            const validPass = bcrypt.compareSync(body.password, datos.password);
            if(!validPass) {
                return res.status(400).json({
                    errors: "Please add correct username and password"
                })
            }
            const jwtToken = jwt.sign({
                data: {_id: datos._id, username: datos.username, password: datos.password}
              }, secret, { expiresIn: expir });
            //const jwtToken = jwt.sign({_id: datos._id, username: datos.username, password: datos.password}, 'myPassword');
            res.json({
                usuario: {
                    _id: datos._id,
                    username: datos.username
                },
                token: jwtToken
            });
        } else {
            res.status(400).json({
                errors: "Please add correct username and password"
            })
        }
    })
    .catch(err => {
        res.status(400).json({
            error:"OK",
            msj: "Error en el servicio "+ err
        })
    })
})

module.exports.authRouter = router;