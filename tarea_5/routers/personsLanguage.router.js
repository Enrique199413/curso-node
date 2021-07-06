const router = require('express').Router()
const {readLanguage, addLanguage, deleteLanguage} = require('../middlewares/personsLanguage.model').PersonsLanguage
 
router
    .post('/', (async(req, res) => {
        const data = {
            "records": [
                {
                    "fields": {
                      "ID": "Lenguajes que domina Rafael",
                      "Persona": [
                        "recNfOAD4ihidGx7O"
                      ],
                      "LenguajesQueDomina": [
                        "recqnrYVLpnaCWG3x",
                        "recaT9Qs2TNBILIHa"
                      ]
                    }
                  }
            ]
          }
        try {
            const allUsers = await addLanguage(data)
            console.log('SUCCESS', allUsers)
            res.status(200).json(allUsers)
        } catch (e) {
            console.log('ERROR')
            res.status(400).json(JSON.stringify(e))
        }
    }))
    .delete('/:id', (async(req, res) => {
        try {
            const resp = await deleteLanguage(req.params.id)
            res.status(200).json(resp)
        } catch (e) {
            console.log('ERROR')
            res.status(400).json(JSON.stringify(e))
        }
    }))
    .get('/', (async(req, res) => {
        try {
            const allUsers = await readLanguage()
            console.log('SUCCESS', allUsers)
            res.status(200).json(allUsers)
        } catch (e) {
            console.log('ERROR')
            res.status(400).json(JSON.stringify(e))
        }
    }))
    .patch('/:id', ((req, res) => {
        res.status(200).json({ method: 'PATCH' })
    }))


 
module.exports = router