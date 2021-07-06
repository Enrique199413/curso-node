const auth = (req, res, next) => {
    if (!req.headers['authorization']) {
        res.status(401).send({
            message: 'Please add Authorization on Headers'
        })
    }else{
        next()
    }
}

module.exports = auth