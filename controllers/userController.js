const { response } = require('express')
const fetch = require('node-fetch')
const AIRTABLE_APIKEY = process.env.AIRTABLE_APIKEY

//CRUD
const addUser = async(data) => {
    try {
        //console.log(data)
        const responseCreate = await fetch('https://api.airtable.com/v0/appgiwqXmBRiTiCXK/Personas%20en%20el%20curso',{
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${AIRTABLE_APIKEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return await responseCreate.json()
    } catch (error) {
        return {error: 404}
    }
}

const updateUser = () => {

}

const deleteUser = async(id) => {
    try {
        const responseCreate = await fetch(`https://api.airtable.com/v0/appgiwqXmBRiTiCXK/Personas%20en%20el%20curso/${id}`,{
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${AIRTABLE_APIKEY}`
            }
        })
        return await responseCreate.json()
    } catch (error) {
        return {error: 404}
    }
}

const readUser = async() => {
    try {
        const responseUsers = await fetch('https://api.airtable.com/v0/appgiwqXmBRiTiCXK/Personas%20en%20el%20curso?view=Grid%20view', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${AIRTABLE_APIKEY}` 
          },
        })
        //console.log(responseUsers, 'DATA')
    
        const allUsers = await responseUsers.json()
    
        //console.log(allUsers)
        return {
            count: allUsers.records.length,
            data: allUsers.records
        }
    }catch (e) {
        return {error: 404}
    }
}

module.exports.User = {
    addUser,
    updateUser,
    deleteUser,
    readUser

}
    
  
