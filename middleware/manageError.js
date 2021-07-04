const manageErrors = (err, req, res, next) => {
    console.error(err, 'El error es')
    res.status(500).json({messagw: 'sdfgds'})
}

module.exports = manageErrors