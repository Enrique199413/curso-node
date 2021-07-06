const fetch = require('node-fetch')
const airtableAPIKey = process.env['AIRTABLE_APIKEY']
 
const addLanguage = async(data) => {
    try {
        const responseUsers = await fetch(
            'https://api.airtable.com/v0/appgiwqXmBRiTiCXK/PersonasLenguajes', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${airtableAPIKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        } )

        const resp = await responseUsers.json()
        return resp
    } catch (e) {
        res.status(404)
    }
}
 
const updateLanguage = () => {}
 
const deleteLanguage = async(id) => {
    try {
        const responseUsersDelete = await fetch(
            `https://api.airtable.com/v0/appgiwqXmBRiTiCXK/PersonasLenguajes?records[]=${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${airtableAPIKey}`
            }
        } )

        const allUsers = await responseUsersDelete.json()

        return {
            data: allUsers
        }
    } catch (e) {
        res.status(404)
    }
}
 
const readLanguage = async() => {
    try {
        const responseUsers = await fetch(
            'https://api.airtable.com/v0/appgiwqXmBRiTiCXK/PersonasLenguajes', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${airtableAPIKey}`
            }
        } )

        const allUsers = await responseUsers.json()

        return {
            data: allUsers.records
        }
    } catch (e) {
        res.status(404)
    }
}
 
module.exports.PersonsLanguage = {
    readLanguage,
    addLanguage,
    deleteLanguage
}