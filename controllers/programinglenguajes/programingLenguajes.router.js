const router = require('express').Router()
const programingLanguajes = require('./programingLenguajes.model').ProgramingLanguajes

router
    .post('/add', async (req, res) => {
        console.log('Entrando al post programing languages')
        const addProgramingLanguajes = await programingLanguajes.addProgramingLanguajes(req.body)
        console.log(addProgramingLanguajes)
        res.status(200).json(addProgramingLanguajes)
    })
    .delete('/:id', async (req, res) => {
        console.log('Entrando al delete')
        const {params: {id}} = req
        console.log(id)
        const statusDeleteUser = await programingLanguajes.deleteProgramingLanguajes(id)
        console.log(statusDeleteUser)
        res.status(200).json(statusDeleteUser)
    })
    .get('/all', async (req, res) => {
        console.log('22222')
        const allProgramingLanguages = await programingLanguajes.readProgramingLanguajes(10)
        console.log(programingLanguajes)
            res.status(200).json(allProgramingLanguages)

    })
    .get('/:id', async (req, res) => {
        console.log('Entrando al get by id')
        const {params: {id}} = req
        console.log(id)
        const getProgramingLanguajes = await programingLanguajes.getByIdProgramingLanguajes(id)
        console.log(getProgramingLanguajes)
        res.status(200).json(getProgramingLanguajes)
    })
    .patch('/:id', (req, res) => {
        res.status(200).json({
            method: 'PATCH '
        })
    })

module.exports = router