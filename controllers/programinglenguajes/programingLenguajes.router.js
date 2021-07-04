const router = require('express').Router()
const programingLanguajes = require('./programingLenguajes.model').ProgramingLanguajes

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
        programingLanguajes.readProgramingLanguajes().then(response =>{
            res.status(200).json(response)
        }).catch( error =>  {
            res.status(500).json(response)
        })

    })
    .get('/:id', (req, res) => {
        res.status(200).json({
            method: 'GET '
        })
    })
    .patch('/:id', (req, res) => {
        res.status(200).json({
            method: 'PATCH '
        })
    })