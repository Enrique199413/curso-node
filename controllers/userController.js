const { response } = require('express')
const fetch = require('node-fetch')
const AIRTABLE_APIKEY = process.env.AIRTABLE_APIKEY

//CRUD
const addUser = async(data) => {

}

const updateUser = () => {

}

const deleteUser = async(id) => {
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
    
  
