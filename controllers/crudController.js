// Crud controller
const fetch = require('node-fetch')
const airtableAPIKey = process.env.AIRTABLE_APIKEY_MAC

const allUrl = 'https://api.airtable.com/v0/appY2q7yIwLmh5mrh/Personas%20en%20el%20curso'

const optionGet = {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${airtableAPIKey}`
    }
}

const optionPost = {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${airtableAPIKey}`,
        'Content-Type': 'application/json',
        body: ''
    }
}

const optionDel = {
    method: 'DELETE',
    headers: {
        'Authorization': `Bearer ${airtableAPIKey}`
    }
}

const readUsers = async() => {
    //todo read user
    try {
        if(!airtableAPIKey){
            res.status(401).json({code:401});
        }
        const fetchAllUsers = await fetch(allUrl, optionGet)

        const responseAll = await fetchAllUsers.json()

        return {
            count: responseAll.length,
            data: responseAll.records
        }
    } catch (e) {
        res.status(500)
    }
}

const createUser = async (data) => {
    optionPost.body = JSON.stringify(data)
    try {
        if(!airtableAPIKey){
            res.status(401).json({code:401});
        }
        const addedUser = await fetch(allUrl, optionPost)

        const newUser = await addedUser.json()
        return newUser
    } catch (e) {
        res.status(500)
    }
}

const deleteUser = async(id) => {
    //todo delete user
    try {
        if(!airtableAPIKey){
            res.status(401).json({code:401});
        }
        const concatUrl = allUrl+`?records[]=${id}`;
        console.log(concatUrl)
        const userDeleted = await fetch(concatUrl, optionDel)

        const delUser = await userDeleted.json()
        console.log(delUser)
        return {
            data: delUser
        }
    } catch (e) {
        res.status(500)
    }
}

module.exports.User = {
    readUsers,
    createUser,
    deleteUser
}