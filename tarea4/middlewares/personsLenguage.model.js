const fetch = require('node-fetch')

const addLanguage = async(data) => {
    try {
        const responsePersonsL = await fetch('https://api.airtable.com/v0/appgiwqXmBRiTiCXK/PersonasLenguajes', { method: 'POST', headers: { 'Authorization': 'Bearer key30iKlvp6M1SGk0', 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        const allUsers = await responsePersonsL.json()
        return allUsers
    } catch (e) {
        return { error: 404 }
    }
}

const updateLanguage = () => {}

const deleteLanguage = async(id) => {
    try {
        const responsePersonsL = await fetch('https://api.airtable.com/v0/appgiwqXmBRiTiCXK/PersonasLenguajes/' + id, { method: 'DELETE', headers: { 'Authorization': 'Bearer key30iKlvp6M1SGk0' } })
        const allUsers = await responsePersonsL.json()
        return allUsers
    } catch (e) {
        return { error: 404 }
    }
}

const readLanguage = async() => {
    try {
        const responsePersonsL = await fetch('https://api.airtable.com/v0/appgiwqXmBRiTiCXK/PersonasLenguajes', { method: 'GET', headers: { 'Authorization': 'Bearer key30iKlvp6M1SGk0' } })
        const allPersonsL = await responsePersonsL.json()
        return allPersonsL
    } catch (e) {
        return { error: 404 }
    }
}

module.exports.PersonsLanguage = {
    readLanguage,
    addLanguage,
    deleteLanguage
}