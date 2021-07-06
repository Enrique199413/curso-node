const dotenv = require('dotenv').config()
const AIRTABLE_API_KEY = process.env['AIRTABLE_API_KEY']
const fetchDefaultOptions = {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`
    }
}

module.exports = fetchDefaultOptions