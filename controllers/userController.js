const fetch = require('node-fetch')
// const AIRTABLE_API_KEY = process.env['AIRTABLE_API_KEY']
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
// CRUD . CREATE READ UPDATE DELETE

const addUser= async (dataBody) => {
    try {
        const resposeUser = await fetch('https://api.airtable.com/v0/appgiwqXmBRiTiCXK/Personas%20en%20el%20curso', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataBody)
        })

        console.log(resposeUser, `DATA`)

        const allUser = await resposeUser.json()
        console.log(allUser)

        return {
            create: true,
            data: allUser
        }

    }catch (e) {
        return { error: 404}

    }
}

const updateUser= () => {
    //TODO update user data
}

const deleteUser= async (id) => {
    //TODO delete user data
    console.log(AIRTABLE_API_KEY, 'SDFVBFGD')
    try {
        const resposeUser = await fetch(`https://api.airtable.com/v0/appgiwqXmBRiTiCXK/Personas%20en%20el%20curso/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`
            }
        })

        //console.log(resposeUser, `DATA`)

        const allUser = await resposeUser.json()

        return {
            data: allUser
        }

    }catch (e) {
        return { error: 404}

    }
}

const readUser= async () => {
    //TODO read user data
    console.log(AIRTABLE_API_KEY, 'SDFVBFGD')
    try {
        const resposeUser = await fetch('https://api.airtable.com/v0/appgiwqXmBRiTiCXK/Personas%20en%20el%20curso?maxRecords=3&view=Grid%20view', {
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

module.exports.User = {
    addUser,
    updateUser,
    deleteUser,
    readUser
}



