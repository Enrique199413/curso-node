const fecth = require('node-fetch')

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const urlLanguagesUser = 'http'
const {fetchDefaulOptions} = requiere('')

const addProgramingLanguajes = () => {

}

const uodateUSer = () => {

}

const deleteUser = () => {

}

const readProgramingLanguajes = async (count) => {
    console.log(AIRTABLE_API_KEY, 'SDFVBFGD')
    try {
        const resposeProgramingLanguajes = await fetch('https://api.airtable.com/v0/appgiwqXmBRiTiCXK/Personas%20en%20el%20curso?maxRecords=3&view=Grid%20view', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`
            }
        })

        console.log(resposeUser, `DATA`)

        const allUser = await resposeUser.json()

        return {
            count: allUser.records.length,
            data: allUser.records
        }

    }catch (e) {
        return { error: 404}

    }

}


module.exports.ProgramingLanguajes = { readProgramingLanguajes}