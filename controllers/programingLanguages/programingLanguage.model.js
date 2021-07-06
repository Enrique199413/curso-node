const fetch = require('node-fetch')

const addProgramingLanguage = () => {

}

const updateProgramingLanguage = () => {

}

const deleteProgramingLanguage = () => {

}

const readProgramingLanguage = async() => {
    try {
        const responseProgramingL = await fetch('https://api.airtable.com/v0/appgiwqXmBRiTiCXK/LenguajesProgramacion', { method: 'GET', headers: { 'Authorization': 'Bearer key30iKlvp6M1SGk0' } })
        const allProgramingL = await responseProgramingL.json()
        return allProgramingL
    } catch (e) {
        return { error: 404 }
    }

}

module.exports.ProgramingLanguage = {
    readProgramingLanguage
}