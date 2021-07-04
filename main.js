const express = require('express')
const dotenv = requiere('dotenv').config()
const fetch = require('node-fetch')
const app = express()
const port = process.env.PORT
const AIRTABLE_API_KEY = process.env['AIRTABLE_API_KEY']

const userRouter = require('./index.programing')
const UserController = require('./controllers/userController')
const {readUser} = require('./controllers/userController')


app.use((req => {}))

app.get('/user/all4', async (req, res) => {
    try {
        const resposeUser = await fetch('https://api.airtable.com/v0/appgiwqXmBRiTiCXK/Personas%20en%20el%20curso', {
            method: 'GET',
            header: {
                'Authorization': 'Bearer'
            }
        })

        const allUser = await resposeUser.jsoc()

        res.status(200).json({
                count: allUser.records.length,
                data: allUser.records
        })

    }catch (e) {
        res.status(400).json(JSON.stringify(e))

    }
})


app.get('/user/all/controller4', async (req, res) => {
    try {

        const  allUsers = await readUser()

        res.status(200).json(allUsers)

    }catch (e) {
        res.status(400).json(JSON.stringify(e))

    }
})

module.exports.User = {

}