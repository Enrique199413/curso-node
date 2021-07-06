const express = require('express')
const fetch = require('node-fetch')
const app = express()
const port = 8080
const { addUser, deleteUser, readUser } = require('./../controllers/useController').User

app.get('/users/all', async(req, res) => {
    try {
        console.log('SUCCESS')
        const allUsers = await (readUser())
        return res.status(200).json(allUsers)
    } catch (e) {
        return res.status(400)
    }
})


app.post('/users/add', async(req, res) => {
    const data = {
        'fields': {
            'Name': 'testAme'
        }
    }
    try {
        console.log('SUCCESS POST', res)
        const addUsers = await fetch(addUser(data))
        return res.status(200).send(addUsers)
    } catch (e) {
        return res.status(400)
    }
})

app.put('/users/update', async(req, res) => {
    // todo
})

app.delete('/users/delete', async(req, res) => {
    const id = 'receWfvr7TgfxH5Kq'
    try {
        console.log('SUCCESS DELETE')
        const deleteUsers = await fetch(deleteUser(id))
        return res.status(200).destroy(deleteUsers)
    } catch (e) {
        return res.status(400)
    }
})


// Server setup
app.listen(port, () => {
    console.log(`Trabajando en el puerto ${port}`);
});

module.exports = app