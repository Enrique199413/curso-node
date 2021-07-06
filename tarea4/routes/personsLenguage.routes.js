const router = require('express').Router()
const PersonsLanguage = require('./../middlewares/personsLenguage.model').PersonsLanguage

router
    .post('/add', (async(req, res) => {
        const data = {
            "fields": {
                "ID": "Lenguajes que domina Rafita",
                "Persona": [
                    "recsWXrKsjnYIbbbL",
                    "reclr6ClKWx0vXCt9",
                    "recT1k0XonApm9Eca"
                ],
                "LenguajesQueDomina": [
                    "recaT9Qs2TNBILIHa"
                ]
            }
        }
        const addUsers = await PersonsLanguage.addLanguage(data)
        res.status(200).send(addUsers)
    }))
    .delete('/delete', (async(req, res) => {
        const id = 'recCz1R8pewZe6Dhu'
        const deletePersonsLanguages = await PersonsLanguage.deleteLanguage(id)
        res.status(200).destroy(deletePersonsLanguages)
        console.log('delete success')
    }))
    .get('/all', (async(req, res) => {
        const allPersonsLanguages = await PersonsLanguage.readLanguage()
        res.status(200).json(allPersonsLanguages)
    }))
    .patch('/:id', ((req, res) => {
        res.status(200).json({ method: 'PATCH' })
    }))



module.exports = router