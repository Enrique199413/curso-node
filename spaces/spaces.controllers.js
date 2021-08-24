const config = require('config');
const Space = require('../models/space_model')

const getAllSpaces = async () => {
    //Clase -> Objetos
    try {
        const spaces = await Space.find();
        return Promise.resolve(spaces);
    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    }
}

module.exports = {
    getAllSpaces
}