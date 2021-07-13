const fetch = require('node-fetch')

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const urlLanguagesUser = 'https://api.airtable.com/v0/appgiwqXmBRiTiCXK/LenguajesProgramacion'
const {fetchDefaulOptions} = require('../../utils/utils')

const addProgramingLanguajes = async (dataBody) => {
    try {
        const resposeProgramingLanguajes = await fetch(urlLanguagesUser, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataBody)
        })

        console.log(resposeProgramingLanguajes, `DATA`)

        const allProgramingL = await resposeProgramingLanguajes.json()
        console.log(allProgramingL)

        return {
            create: true,
            data: allProgramingL
        }

    }catch (e) {
        return { error: 404}

    }

}

const updatePrograminLanguaages = async (id) => {

    const data = {
        "fields": {
            "Name": "PHP update"
        },
        "typecast": true
    }
    // insertar una lista de hasta 10
    const data10 = {
        "records": [
            {
                "fields": {
                    "Name": "Python"
                }
            },
            {
                "fields": {
                    "Name": "Javascript",
                    "PersonasLenguajes": [
                        "recWP9cmqy1uALzDm",
                        "rec4tJ8xcXrumnVPp",
                        "recCrzHdzo8LmJOcL"
                    ]
                }
            }
        ],
        "typecast": true
    }
    try {
        const resposeProgramingLanguajes = await fetch(urlLanguagesUser+ `/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        console.log(resposeProgramingLanguajes, `DATA`)

        const allProgramingL = await resposeProgramingLanguajes.json()
        console.log(allProgramingL)

        return {
            create: true,
            data: allProgramingL
        }

    }catch (e) {
        return { error: 404}

    }
}

const deleteProgramingLanguajes = async (id) => {
    //Cambiar option
    try {
        const statusDeleteProgramingLanguajes= await fetch(urlLanguagesUser + `/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`
            }
        })

        console.log(statusDeleteProgramingLanguajes, `DATA`)

        const allUser = await statusDeleteProgramingLanguajes.json()

        return {
            data: statusDeleteProgramingLanguajes
        }
    }catch (e) {
        return { error: 404}

    }

}

const readProgramingLanguajes = async (count) => {
    console.log('si se ejecuts', urlLanguagesUser, fetchDefaulOptions)
    try {

        const option = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`
            }
        }

        console.log('si se ejecuts', urlLanguagesUser, option)

        console.log('33333')
        const resposeProgramingLanguajes = await fetch(urlLanguagesUser, option)

        console.log(resposeProgramingLanguajes)
        console.log(resposeProgramingLanguajes, `DATA`)

        const allLanguajes = await resposeProgramingLanguajes.json()

        return {
            count: count,
            data: allLanguajes.records
        }

    }catch (e) {
        return { error: 404}

    }

}

const getByIdProgramingLanguajes = async (id) => {
    //Cambiar option
    try {
        console.log('GET, by id', id)
        console.log(urlLanguagesUser + `/${id}`)
        const getProgramingLanguajes= await fetch(urlLanguagesUser + `/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`
            }
        })

        console.log(getProgramingLanguajes, `DATA`)

        const allUser = await getProgramingLanguajes.json()

        return {
            data: getProgramingLanguajes
        }
    }catch (e) {
        return { error: 404}

    }

}


module.exports.ProgramingLanguajes = { readProgramingLanguajes, deleteProgramingLanguajes, addProgramingLanguajes, updatePrograminLanguaages, getByIdProgramingLanguajes}