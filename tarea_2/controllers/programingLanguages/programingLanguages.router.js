const router = require('express').Router()

//all, eliminar uno, consultar uno, modificar uno

router
    .post('/add', (req, res) => {
        res.status(200).json({
            method: 'POST'
        })
    })
    .delete('/:id', (req, res) => {
        res.status(200).json({
            method: 'DELETE'
        })
    })
    .get('/all', (req, res) => {
        res.status(200).json({
            method: 'GET'
        })
    })
    .get('/:id', (req, res) => {
        res.status(200).json({
            method: 'GET'
        })
    })
    .patch('/:id', (req, res) => {
        res.status(200).json({
            method: 'PATCH'
        })
    })

module.exports = router