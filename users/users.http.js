//Maneja request y response, handler
const {addUser, getAllUsers, updUser, delUser} = require('./users.controllers');
const {objectUtils} = require('../utils/utils');

const addUserHttp = async (req, res) => {
    //res.status(200).json({ok: 'desde addUserHTTP, POST'});
    const {
        message, 
        canContinue: isValidBody
    } = objectUtils.existPropertiesOnObject(req.body, 'name', 'lastName', 'surName');
    
    if(!isValidBody){
        res.status(400).json({message});
        return
    }
    try {
        const isUserAdd = await addUser(req.body);
        console.log(isUserAdd)
        res.status(201).json({
            code:201,
            id: isUserAdd 
            /*userCreated: {
                ...req.body,
                _id: isUserAdd
            }*/
        });
    } catch(e) {
        console.error(e);
        res.status(400).json(error);
    }
}
//Updating user
const updUserHttp = async (req, res) => {
    console.log("From http object update")
    console.log(req.params)
    console.log("Getting id")
    const {id} = req.params;
    console.log(id)
    const {
        message, 
        canContinue: isValidBody
    } = objectUtils.existPropertiesOnObject(req.body, 'name', 'lastName', 'surName');
    
    if(!isValidBody){
        res.status(400).json({message});
        return
    }
    try {
        const isUserUpd = await updUser(id,req.body);
        console.log(isUserUpd)
        res.status(201).json({
            code:201,
            userUpdated: {
                isUserUpd
            }
        });
    } catch(e) {
        console.error(e);
        res.status(400).json(error);
    }
}
//
//Deleting user
const delUserHttp = async (req, res) => {
    console.log("From http object delete")
    console.log(req.params)
    console.log("Getting id")
    const {id} = req.params;
    console.log(id)
    
    try {
        const isUserDel = await delUser(id);
        console.log(isUserDel)
        res.status(200).json({
            code:200,
            userDeleted: {
                id
            }
        });
    } catch(e) {
        console.error(e);
        res.status(400).json(error);
    }
}
//

const getAllUsersHttp = (req, res) => {
    getAllUsers().then(resultados => {
        res.status(200).json(resultados);
    }).catch(error => {
        res.status(400).json(error);
    })
    
}

module.exports = {
    addUserHttp,
    updUserHttp,
    delUserHttp,
    getAllUsersHttp
}