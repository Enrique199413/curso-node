const auth = (req, res, next) => {
    if(!req.headers['Authorization']) {
        res.status(401).send({
            message: 'Please add Authorization on header'
        })
    } else {
        next()
    }
}

module.exports = auth