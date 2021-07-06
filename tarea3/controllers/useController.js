const fetch = require('node-fetch')
const url = 'https://api.airtable.com/v0/appgiwqXmBRiTiCXK/Personas%20en%20el%20curso'

const addUser = async(data) => {
    try {
        const responseUsers = await fetch('https://api.airtable.com/v0/appgiwqXmBRiTiCXK/Personas%20en%20el%20curso', { method: 'POST', headers: { 'Authorization': 'Bearer key30iKlvp6M1SGk0', 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        const allUsers = await responseUsers.json()
        return allUsers
    } catch (e) {
        return { error: 400 }
    }
}

const updateUser = async() => {
    //tdo
}

const deleteUser = async(id) => {
    try {
        const responseUsers = await fetch(
            'https://api.airtable.com/v0/appgiwqXmBRiTiCXK/Personas%20en%20el%20curso/' + id, { method: 'DELETE', headers: { 'Authorization': 'Bearer key30iKlvp6M1SGk0' } })
        const allUsers = await responseUsers.json()
        return allUsers;
    } catch (e) {
        return { error: 400 }
    }
}

const readUser = async() => {
    try {
        const responseUsers = await fetch(url, { method: 'GET', headers: { 'Authorization': 'Bearer key30iKlvp6M1SGk0' } })
        const allUsers = await responseUsers.json()
        return {
            count: allUsers.records.length,
            data: allUsers.records
        }
    } catch (e) {
        return { error: 400 }
    }
}

module.exports.User = { addUser, updateUser, deleteUser, readUser }