const auth = (req, res, next) => {
    console.log(req)
    if (!req.headers['authorization']){
        res.status(401).send({
            message: 'Please add Authorization'
        })
    } else {
        next()
    }
}

module.exports = auth