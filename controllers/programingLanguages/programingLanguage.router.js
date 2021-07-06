const router = require('express').Router()
const programingLanguage = require('./programingLanguage.model').ProgramingLanguage

router
    .post('/add', ((req, res) => {
        res.status(200).json({ method: 'POST' })
    }))
    .delete('/:id', ((req, res) => {
        res.status(200).json({ method: 'DELETE' })
    }))
    .get('/all', (async(req, res) => {
        const allLanguages = await programingLanguage.readProgramingLanguage()
        res.status(200).json(allLanguages)
    }))
    .patch('/:id', ((req, res) => {
        res.status(200).json({ method: 'PATCH' })
    }))



module.exports = router